using EquineCastration.Config;
using EquineCastration.Models.Emails;
using EquineCastration.Services.Contracts;
using Microsoft.Extensions.Options;

namespace EquineCastration.Services.EmailServices;

public class DischargeEmailService
{
  private readonly IEmailSender _emails;
  private readonly AppDownloadOptions _download;

  public DischargeEmailService(IEmailSender emails, IOptions<AppDownloadOptions> downloadOptions)
  {
    _emails = emails;
    _download = downloadOptions.Value;
  }
  
  public async Task SendDischargeWithRegistrationRequest(EmailAddress to, string horseName, string dischargeDate,
    string veterinarianName)
    => await _emails.SendEmail(
      to,
      "Emails/DischargeRegistrationRequest",
      new DischargeEmailModel(
        to.Name!,
        horseName,
        dischargeDate,
        veterinarianName,
        _download.iOS,
        _download.Android
      ));
  
  public async Task SendDischarge(EmailAddress to, string horseName, string dischargeDate,
    string veterinarianName)
    => await _emails.SendEmail(
      to,
      "Emails/Discharge",
      new DischargeEmailModel(
        to.Name!,
        horseName,
        dischargeDate,
        veterinarianName,
        _download.iOS,
        _download.Android
      ));
}
