using EquineCastration.Data;
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

  public async Task<IEnumerable<CaseModel>> List(string userId)
  {
    var entity = await _db.Cases
      .Where(x => x.Author.Id == userId)
      .ToListAsync();

    var result = entity.Select(x => new CaseModel
    {
      Id = x.Id
    });
  }
}
