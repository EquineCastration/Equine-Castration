using EquineCastration.Data;
using EquineCastration.Models.Survey;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Services;

public class SurveyService
{
  private readonly ApplicationDbContext _db;

  public SurveyService(ApplicationDbContext db)
  {
    _db = db;
  }

  public async Task<List<SurveyModel>> ListByCase(string userId, int caseId)
  {
    var surveys = await _db.Surveys
      .AsNoTracking()
      .Include(x => x.SurveyType)
      .Include(x => x.Case)
      .ThenInclude(y => y.Horse)
      .Where(x => x.Case.Id == caseId && (
          x.Case.Author.ApplicationUserId == userId ||
          x.Case.Owner.ApplicationUserId == userId
        )
      )
      .ToListAsync();
    return surveys.ConvertAll<SurveyModel>(x =>
      new SurveyModel(x));
  }

  public async Task<SurveyModel> Get(int id)
  {
    var survey = await _db.Surveys
                   .AsNoTracking()
                   .Include(x => x.SurveyType)
                   .Include(x => x.Case)
                   .ThenInclude(y => y.Horse)
                   .Where(x => x.Id == id)
                   .SingleOrDefaultAsync()
                 ?? throw new KeyNotFoundException();
    return new SurveyModel(survey);
  }

  public async Task<SurveyModel> Create(CreateSurveyModel model)
  {
    var existingSurvey = await _db.Surveys
      .AsNoTracking()
      .Where(x => x.Case.Id == model.CaseId && x.SurveyType.Name.ToLower().Equals(model.SurveyType.ToLower()))
      .FirstOrDefaultAsync();

    if (existingSurvey is not null)
      return await Get(existingSurvey.Id); // simply return existing survey if it exists

    var surveyType = await _db.SurveyTypes
                       .AsNoTracking()
                       .Where(x => x.Name.ToLower().Equals(model.SurveyType.ToLower()))
                       .SingleOrDefaultAsync()
                     ?? throw new KeyNotFoundException();

    var surveyCase = await _db.Cases
                       .Include(x => x.Horse)
                       .Where(x => x.Id == model.CaseId)
                       .SingleOrDefaultAsync()
                     ?? throw new KeyNotFoundException();

    surveyCase.Horse.OwnershipLength = model.HorseOwnership; // update horse ownership length

    var entity = model.ToEntity(surveyType, surveyCase);
    await _db.Surveys.AddAsync(entity);
    await _db.SaveChangesAsync();

    return await Get(entity.Id);
  }

  public async Task<bool> IsCaseAuthorOrOwner(string userId, int caseId)
  {
    var isAuthorOrOwner = await _db.Cases
      .AsNoTracking()
      .Where(x => x.Id == caseId && (
          x.Author.ApplicationUserId == userId ||
          x.Owner.ApplicationUserId == userId
        )
      )
      .FirstOrDefaultAsync();
    return isAuthorOrOwner is not null;
  }
}
