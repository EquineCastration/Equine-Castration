using EquineCastration.Data;
using Functions.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Functions.Services;
public class SurveyService : ISurveyService
{
  private readonly ApplicationDbContext _db;

  public SurveyService(ApplicationDbContext db)
  {
    _db = db;
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

        }
      }
    }

  }
}
