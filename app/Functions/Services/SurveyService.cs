using Functions.Services.Contracts;
using System.Net.Http.Json;
using EquineCastration.Data;
using EquineCastration.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Functions.Services;
public class SurveyService : ISurveyService
{
  private readonly ApplicationDbContext _db;
  private readonly HttpClient _client;

  public SurveyService(ApplicationDbContext db, IHttpClientFactory httpClientFactory)
  {
    _db = db;
    _client = httpClientFactory.CreateClient("client");
  }

  public async Task SendOwnerSurveys()
  {
    //Get all cases which have:
    //90 or fewer days since the discharge date
    //No deceased horse
    //No opt outs for their owners from email/push
    var cases = await _db.Cases
      .AsNoTracking()
      .Include(x => x.Owner)
      .Include(x => x.Surveys)
      .ThenInclude(y => y.SurveyType)
      .Include(x => x.Horse)
      .Where(x => x.DischargeDate.AddDays(90) >= DateTime.Now && x.Horse.Deceased == false && x.Owner.OptOut == false)
      .ToListAsync();
    
    //Get a list of every survey type
    var surveyTypes = await _db.SurveyTypes
      .AsNoTracking()
      .OrderByDescending(x => x.DaysAfterCase)
      .ToListAsync();

    //foreach case
    foreach (var c in cases)
    {
      var numberOfDays = (int)(DateTimeOffset.Now - c.DischargeDate).TotalDays;
      var surveyType = surveyTypes.FirstOrDefault(x => x.DaysAfterCase <= numberOfDays);

      var existingSurvey = await _db.Surveys.AsNoTracking()
        .SingleOrDefaultAsync(x => x.SurveyType == surveyType && x.Case.Id == c.Id);

      if (existingSurvey is not null) continue; // skip if survey already exists
      
      var model = new NewSurveyNotificationModel
      {
        HorseName = c.Horse.Name,
        DischargeDate = c.DischargeDate,
        OwnerEmail = c.Owner.Email,
        Days = numberOfDays
      };
      await SendOwnerSurvey(model);
    }
  }

  private async Task SendOwnerSurvey(NewSurveyNotificationModel model)
  {
    var response = await _client.PostAsJsonAsync("Surveys/SendSurveyNotification", model);
    response.EnsureSuccessStatusCode();
  }
}


