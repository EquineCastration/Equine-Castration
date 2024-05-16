using EquineCastration.Data;
using EquineCastration.Data.Models;
using EquineCastration.Models.Emails;
using EquineCastration.Models.Survey;
using EquineCastration.Services.Contracts;
using EquineCastration.Services.EmailServices;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Services;

public class SurveyService
{
  private readonly ApplicationDbContext _db;
  private readonly SurveyEmailService _surveyEmail;

  public SurveyService(ApplicationDbContext db, SurveyEmailService surveyEmail)
  {
    _db = db;
    _surveyEmail = surveyEmail;
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

  public async Task<EligibleSurveyTypeModel?> GetEligibleSurveyTypeForCreation(int caseId)
  {
    var entity = await _db.Cases.AsNoTracking().Where(x=>x.Id == caseId).SingleOrDefaultAsync()
      ?? throw new KeyNotFoundException("Case not found.");

    var surveyType = await GetEligibleSurveyTypeByDate(entity.DischargeDate); // get eligible survey type

    if (surveyType is not null)
    {
      var existingSurvey = await _db.Surveys
        .AsNoTracking()
        .Where(x => x.Case.Id == caseId && x.SurveyType.Id == surveyType.Id)
        .FirstOrDefaultAsync();
      
      if (existingSurvey is null) 
        return new EligibleSurveyTypeModel(surveyType, (int)(DateTimeOffset.UtcNow - entity.DischargeDate).TotalDays); // if no existing survey, return eligible survey type
    }
    return null;
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
      .Where(x => x.Case.Id == model.CaseId && x.SurveyType.Id == model.SurveyTypeId)
      .FirstOrDefaultAsync();

    if (existingSurvey is not null)
      return await Get(existingSurvey.Id); // simply return existing survey if it exists

    var surveyType = await _db.SurveyTypes
                       .AsNoTracking()
                       .Where(x => x.Id == model.SurveyTypeId)
                       .SingleOrDefaultAsync()
                     ?? throw new KeyNotFoundException("Survey type not found.");

    var surveyCase = await _db.Cases
                       .AsNoTracking()
                       .Where(x => x.Id == model.CaseId)
                       .SingleOrDefaultAsync()
                     ?? throw new KeyNotFoundException("Case not found.");

    var eligibleSurveyType = await GetEligibleSurveyTypeByDate(surveyCase.DischargeDate);
    
    if (eligibleSurveyType is null || eligibleSurveyType.Id != surveyType.Id)
      throw new InvalidOperationException($"Creation of Survey type {surveyType.Name} is not allowed at this time.");
    
    _db.Attach(surveyType);
    _db.Attach(surveyCase);
    
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
  
  /// <summary>
  /// Sends an email out to a horse owner notifying them of a new survey.
  /// </summary>
  /// <param name="model"></param>
  /// <returns></returns>
  public async Task SendOwnerSurveyNotification(NewSurveyNotificationModel model) 
    => await _surveyEmail.SendOwnerSurveyNotification(new EmailAddress(model.OwnerEmail), model);
  
  
  private async Task<SurveyTypeModel?> GetEligibleSurveyTypeByDate(DateTimeOffset dischargeDate)
  {
    var surveyTypes = await _db.SurveyTypes.AsNoTracking().OrderByDescending(x => x.DaysAfterCase).ToListAsync();

    var numberOfDays = (int)(DateTimeOffset.Now - dischargeDate).TotalDays;
    var surveyType = surveyTypes.FirstOrDefault(x => x.DaysAfterCase <= numberOfDays);

    return surveyType is not null 
      ? new SurveyTypeModel(surveyType.Id, surveyType.Name, surveyType.DaysAfterCase) 
      : null; // No eligible survey type
  }
}
