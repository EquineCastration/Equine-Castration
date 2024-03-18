using Functions.Services;
using Functions.Services.Contracts;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace Functions
{
    public class SendSurveyNotifications
    {
    private readonly ISurveyService _surveyService;

    public SendSurveyNotifications(SurveyService surveyService) 
    {
      _surveyService = surveyService;
    }

        [Function("SendSurveyNotification")]
        public async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            await _surveyService.SendOwnerSurveys();
        }
    }
}
