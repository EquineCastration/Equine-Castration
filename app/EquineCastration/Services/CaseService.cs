using EquineCastration.Data;
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
  
  public async Task<List<CaseModel>> ListAll()
  {
    var list = await _db.Cases
      .AsNoTracking()
      .ToListAsync();
    return list.ConvertAll<CaseModel>(x => new CaseModel(x));
  }
  
  public async Task<List<CaseModel>> List(string userId)
  {
    var list = await _db.Cases
      .AsNoTracking()
      .Include(x => x.Author)
      .Where(x=>x.Author.Id== userId)
      .ToListAsync();
    return list.ConvertAll<CaseModel>(x => new CaseModel(x));
  }

  public async Task<CaseModel> Get(int caseId)
  {
    var entity = await _db.Cases
      .AsNoTracking()
      .Include(x => x.Author)
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
                   .Where(x => x.Id == caseId && x.Author.Id==userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    return new CaseModel(entity);
  }

  public async Task<CaseModel> Create(CreateCaseModel newCase, string userId)
  {
    var author = new ApplicationUser() { Id = userId };
    _db.Attach(author);
    var entity = newCase.ToEntity(author);
    await _db.Cases.AddAsync(entity);
    await _db.SaveChangesAsync();
    return new CaseModel(entity);
  }
  
  public async Task<CaseModel> Edit(int caseId, CreateCaseModel caseUpdate)
  {
    var entity = await _db.Cases
                   .AsNoTracking()
                   .Include(x => x.Author)
                   .Where(x => x.Id == caseId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    _db.Entry(entity).CurrentValues.SetValues(caseUpdate);
    await _db.SaveChangesAsync();
    return new CaseModel(entity);
  }
  
  public async Task<CaseModel> EditAuthorCase(int caseId, CreateCaseModel caseUpdate, string userId)
  {
    var entity = await _db.Cases
                   .AsNoTracking()
                   .Include(x => x.Author)
                   .Where(x => x.Id == caseId && x.Author.Id==userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    _db.Entry(entity).CurrentValues.SetValues(caseUpdate);
    await _db.SaveChangesAsync();
    return new CaseModel(entity);
  }

  public async Task Delete(int caseId)
  {
    var entity = await _db.Cases
                   .AsNoTracking()
                   .Include(x => x.Author)
                   .Where(x => x.Id == caseId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    _db.Cases.Remove(entity);
    await _db.SaveChangesAsync();
  }
  
  public async Task DeleteAuthorCase(int caseId, string userId)
  {
    var entity = await _db.Cases
                   .AsNoTracking()
                   .Include(x => x.Author)
                   .Where(x => x.Id == caseId && x.Author.Id==userId)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    _db.Cases.Remove(entity);
    await _db.SaveChangesAsync();
  }
}
