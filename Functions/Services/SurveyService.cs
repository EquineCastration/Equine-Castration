using EquineCastration.Data;
using Functions.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Shared.Models.Account.Email;
using System.Net.Http.Json;

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
    var cases = await  _db.Cases
                                .Include(x => x.Owner)
                                .Include(x => x.Surveys)
                                .ThenInclude(y => y.SurveyType)
                                .Include(x => x.Horse)
                                .Where(x => x.DischargeDate.AddDays(90) < DateTime.Now && x.Deceased == false && x.Owner.OptOut == false)
                                .ToListAsync();

    //Get a list of every survey type
    var surveyTypes = await _db.SurveyTypes.ToListAsync();

    //foreach case
    foreach(var c in cases)
    {
      TimeSpan timeDifference = DateTimeOffset.Now - c.DischargeDate;
      int numberOfDays = (int)timeDifference.TotalDays;

      var surveyType = surveyTypes.Single(x => x.DaysAfterCase == numberOfDays);

      if (surveyType != null)
      { 
        var existingSurvey = _db.Surveys.AsNoTracking().Single(x => x.SurveyType == surveyType && x.Case.Id == c.Id);

        if(existingSurvey == null) 
        {
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
    }
  }

  public async Task SendOwnerSurvey(NewSurveyNotificationModel model)
  {
    var response = await _client.PostAsJsonAsync("Surveys/SendOwnerNotification", model);
    response.EnsureSuccessStatusCode();
  }
}


