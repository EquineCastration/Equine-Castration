using EquineCastration.Models.Emails;
using EquineCastration.Services.Contracts;

namespace EquineCastration.Services.EmailServices;

public class AccountEmailService
{
  private readonly IEmailSender _emails;

  public AccountEmailService(IEmailSender emails)
  {
    _emails = emails;
  }

  public async Task SendAccountConfirmation(EmailAddress to, string link, string resendLink)
      => await _emails.SendEmail(
          to,
          "Emails/AccountConfirmation",
          new TokenEmailModel(
            to.Name!,
            link,
            resendLink));

  public async Task SendPasswordReset(EmailAddress to, string link, string resendLink)
      => await _emails.SendEmail(
          to,
          "Emails/PasswordReset",
          new TokenEmailModel(
            to.Name!,
            link,
            resendLink));

  public async Task SendEmailChange(EmailAddress to, string link)
      => await _emails.SendEmail(
          to,
          "Emails/EmailChangeConfirmation",
          new TokenEmailModel(
            to.Name!,
            link,
            string.Empty));
  
  public async Task SendDeleteUpdate(EmailAddress to)
    => await _emails.SendEmail(
      to,
      "Emails/DeleteUpdate",
      new TokenEmailModel(
        to.Name!,
        string.Empty,
        string.Empty));
  
  public async Task SendAccountDelete(EmailAddress to, string link)
    => await _emails.SendEmail(
      to,
      "Emails/AccountDelete",
      new TokenEmailModel(
        to.Name!,
        link,
        string.Empty));
}

