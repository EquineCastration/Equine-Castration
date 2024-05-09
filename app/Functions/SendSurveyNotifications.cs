using Functions.Services.Contracts;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Functions;

public class SendSurveyNotifications
{
  private readonly ISurveyService _surveyService;
  public SendSurveyNotifications(ISurveyService surveyService) 
  {
    _surveyService = surveyService;
  }

  [Function("SendSurveyNotification")]
  public async Task Run([TimerTrigger("0 0 11 * * *")] TimerInfo myTimer, FunctionContext context)
  {
    var logger = context.GetLogger("SendSummaryEmail");
    logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    await _surveyService.SendOwnerSurveys();
  }
}
