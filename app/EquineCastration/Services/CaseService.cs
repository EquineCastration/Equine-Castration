using EquineCastration.Data;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Case;
using EquineCastration.Models.Emails;
using EquineCastration.Services.EmailServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Services;

public class CaseService
{
  private readonly ApplicationDbContext _db;
  private readonly UserManager<ApplicationUser> _users;
  private readonly DischargeEmailService _dischargeEmail;

  public CaseService(ApplicationDbContext db, UserManager<ApplicationUser> users, DischargeEmailService dischargeEmail)
  {
    _db = db;
    _users = users;
    _dischargeEmail = dischargeEmail;
  }

  public async Task<List<CaseModel>> List(string userId)
  {
    var list = await _db.Cases
      .AsNoTracking()
      .Include(x => x.Author)
      .ThenInclude(x => x.ApplicationUser)
      .Include(x => x.Horse)
      .Include(x => x.Owner)
      .ThenInclude(x => x.ApplicationUser)
      .Where(x => x.Author.ApplicationUserId == userId || x.Owner.ApplicationUserId == userId)
      .ToListAsync();
    return list.ConvertAll<CaseModel>(x => new CaseModel(x));
  }
  
  /// <summary>
  /// List all cases related to the horse owner but with limited information
  /// </summary>
  /// <param name="userId">Horse owner's user id</param>
  /// <returns>Cases</returns>
  public async Task<List<OwnerCaseModel>> ListByOwner(string userId)
  {
    var list = await _db.Cases
      .AsNoTracking()
      .Include(x => x.Horse)
      .Include(x => x.Owner)
      .ThenInclude(x => x.ApplicationUser)
      .Where(x => x.Owner.ApplicationUserId == userId)
      .ToListAsync();
    return list.ConvertAll<OwnerCaseModel>(x => new OwnerCaseModel(x));
  }

  public async Task<CaseModel> Get(int caseId)
  {
    var entity = await _db.Cases
                   .AsNoTracking()
                   .Include(x => x.Author)
                   .ThenInclude(x => x.ApplicationUser)
                   .Include(x => x.Horse)
                   .Include(x => x.Owner)
                   .ThenInclude(x => x.ApplicationUser)
                   .Where(x => x.Id == caseId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    return new CaseModel(entity);
  }

  public async Task<CaseModel> GetAuthorCase(string userId, int caseId)
  {
    var entity = await _db.Cases
                   .AsNoTracking()
                   .Include(x => x.Author)
                   .ThenInclude(x => x.ApplicationUser)
                   .Include(x => x.Horse)
                   .Include(x => x.Owner)
                   .ThenInclude(x => x.ApplicationUser)
                   .Where(x => x.Id == caseId && x.Author.ApplicationUserId == userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    return new CaseModel(entity);
  }

  public async Task<CaseModel> Create(CreateCaseModel model, string userId)
  {
    var owner = await _db.Owners.FirstOrDefaultAsync(x => x.Email == model.ClientEmail);
    
    if (owner is null)
    {
      owner = new Owner { Email = model.ClientEmail };
      _db.Owners.Add(owner);
    }
    else
    {
      _db.Attach(owner);
    }

    var horse = await _db.Horses.FirstOrDefaultAsync(x => x.Name == model.Horse.Name && x.Owner.Email == model.ClientEmail);
    if (horse is null)
    {
      horse = model.ToHorseEntity(owner);
      _db.Horses.Add(horse);
    }
    else
    {
      _db.Attach(horse);
    }

    var author = await _db.Veterinarians
                   .Include(x => x.ApplicationUser)
                   .SingleAsync(x => x.ApplicationUserId == userId)
                 ?? throw new KeyNotFoundException();
    _db.Attach(author);

    var entity = model.ToEntity(author, horse, owner);
    await _db.Cases.AddAsync(entity);
    await _db.SaveChangesAsync();

    if (!entity.Horse.Deceased) // send email only if the horse is not deceased
    {
      var isOwnerNew = await _users.FindByEmailAsync(owner.Email) is null; // Check if the owner is registered
    
      // email type whether the owner is registered or not
      await (isOwnerNew
        ? _dischargeEmail.SendDischargeWithRegistrationRequest(new EmailAddress(owner.Email),
          model.Horse.Name, model.DischargeDate, author.ApplicationUser.FullName)
        : _dischargeEmail.SendDischarge(new EmailAddress(owner.Email),
          model.Horse.Name, model.DischargeDate, author.ApplicationUser.FullName));
    }

    return await Get(entity.Id);
  }

  public async Task<CaseModel> EditAuthorCase(int caseId, CreateCaseModel model, string userId)
  {
    var entity = await _db.Cases
                   .Include(x => x.Author)
                   .Include(x => x.Horse)
                   .Include(x => x.Owner)
                   .Where(x => x.Id == caseId && x.Author.ApplicationUserId == userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();

    var horse = model.ToHorseEntity(entity.Owner);
    horse.Id = entity.Horse.Id;
    _db.Entry(entity.Horse).CurrentValues.SetValues(horse);

    var update = model.ToEntity(entity.Author, horse, entity.Owner);
    update.Id = entity.Id;
    _db.Entry(entity).CurrentValues.SetValues(update);
    await _db.SaveChangesAsync();

    return await Get(entity.Id);
  }

  public async Task DeleteAuthorCase(int caseId, string userId)
  {
    var entity = await _db.Cases
                   .Include(x => x.Horse)
                   .Where(x => x.Id == caseId && x.Author.ApplicationUserId == userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();

    _db.Cases.Remove(entity);
    _db.Horses.Remove(entity.Horse);

    await _db.SaveChangesAsync();
  }

  /// <summary>
  /// Delete all cases authored by the user or owned by the user and their horses
  /// </summary>
  /// <param name="userId"></param>
  public async Task DeleteUserCases(string userId)
  {
    var entity = await _db.Cases
      .Include(x => x.Horse)
      .Where(x => x.Author.ApplicationUserId == userId
                  || x.Owner.ApplicationUserId == userId)
      .ToListAsync();

    _db.Cases.RemoveRange(entity);
    _db.Horses.RemoveRange(entity.Select(x => x.Horse));
    await _db.SaveChangesAsync();
  }
}
