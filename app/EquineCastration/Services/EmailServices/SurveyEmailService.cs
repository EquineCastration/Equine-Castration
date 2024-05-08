using EquineCastration.Config;
using EquineCastration.Data.Models;
using EquineCastration.Models.Emails;
using EquineCastration.Services.Contracts;
using Microsoft.Extensions.Options;

namespace EquineCastration.Services.EmailServices;

public class SurveyEmailService
{
  private readonly IEmailSender _emails;
  private readonly AppDownloadOptions _download;

  public SurveyEmailService(IEmailSender emails, IOptions<AppDownloadOptions> downloadOptions)
  {
    _emails = emails;
    _download = downloadOptions.Value;
  }

  public async Task SendOwnerSurveyNotification(EmailAddress to, NewSurveyNotificationModel model)
    => await _emails.SendEmail(
      to,
      "Emails/OwnerSurveyNotification",
      new NewSurveyNotificationEmailModel(
        model.HorseName,
        model.DischargeDate.ToString("dd/MM/yyyy"),
        model.OwnerEmail,
        model.Days,
        _download.iOS,
        _download.Android
      ));
}
