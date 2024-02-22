using EquineCastration.Data;
using EquineCastration.Data.Entities;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Case;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Services;

public class CaseService
{
  private readonly ApplicationDbContext _db;

  public CaseService(ApplicationDbContext db)
  {
    _db = db;
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
      .Where(x => x.Author.ApplicationUserId == userId)
      .ToListAsync();
    return list.ConvertAll<CaseModel>(x => new CaseModel(x));
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

  public async Task<CaseModel> Create(CreateCaseModel newCase, string userId)
  {
    var owner = await _db.Owners.FirstOrDefaultAsync(x => x.Email == newCase.ClientEmail);

    if (owner is null)
    {
      owner = new Owner { Email = newCase.ClientEmail };
      _db.Owners.Add(owner);
    }
    else
    {
      _db.Attach(owner);
    }

    var horse = await _db.Horses.FirstOrDefaultAsync(x => x.Name == newCase.HorseName);
    if (horse is null)
    {
      horse = new Horse { Name = newCase.HorseName, Owner = owner };
      _db.Horses.Add(horse);
    }
    else
    {
      _db.Attach(horse);
    }

    var author = await _db.Veterinarians.SingleAsync(x => x.ApplicationUserId == userId)
                 ?? throw new KeyNotFoundException();
    _db.Attach(author);

    var entity = newCase.ToEntity(author, horse, owner);
    await _db.Cases.AddAsync(entity);
    await _db.SaveChangesAsync();
    return await Get(entity.Id);
  }

  public async Task<CaseModel> EditAuthorCase(int caseId, CreateCaseModel caseUpdate, string userId)
  {
    var entity = await _db.Cases
                   .Include(x => x.Author)
                   .Include(x => x.Horse)
                   .Include(x => x.Owner)
                   .Where(x => x.Id == caseId && x.Author.ApplicationUserId == userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();

    var update = caseUpdate.ToEntity(entity.Author, entity.Horse, entity.Owner);
    update.Id = entity.Id;
    _db.Entry(entity).CurrentValues.SetValues(update);

    await _db.SaveChangesAsync();
    return await Get(entity.Id);
  }
  
  public async Task DeleteAuthorCase(int caseId, string userId)
  {
    var entity = await _db.Cases
                   .Include(x => x.Author)
                   .Where(x => x.Id == caseId && x.Author.ApplicationUserId == userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    _db.Cases.Remove(entity);
    await _db.SaveChangesAsync();
  }

  public async Task DeleteAuthorAllCases(string userId)
  {
    var entity = await _db.Cases
                   .Include(x => x.Author)
                   .Where(x => x.Author.ApplicationUserId == userId)
                   .ToListAsync()
                 ?? throw new KeyNotFoundException();
    _db.Cases.RemoveRange(entity);
    await _db.SaveChangesAsync();
  }
}
