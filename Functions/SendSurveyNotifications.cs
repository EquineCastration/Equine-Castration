using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
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

        [FunctionName("Function1")]
        public async Task Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            await _surveyService.SendOwnerSurveys();
        }
    }
}
/*
 *     public SendSummaryEmail(IReportingService reportingService)
    {
        _reportingService = reportingService;
    }
    
    [Function("SendSummaryEmail")]
    public async Task Run([TimerTrigger("0 0 11 * * *", RunOnStartup = true)] MyInfo myTimer, FunctionContext context)
    {
        var logger = context.GetLogger("SendSummaryEmail");
        logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
        logger.LogInformation($"Next timer schedule at: {myTimer.ScheduleStatus.Next}");
        
        // Send summary request
        await _reportingService.SendSummary();

    }*/
