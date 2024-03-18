using EquineCastration.Config;
using EquineCastration.Services;
using EquineCastration.Services.Contracts;
using EquineCastration.Services.EmailSender;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Shared.Services.EmailServices;

namespace EquineCastration.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static IServiceCollection AddEmailSender(this IServiceCollection s, IConfiguration c)
    {
      var emailProvider = c["OutboundEmail:Provider"] ?? string.Empty;

      var outboundProvider = emailProvider.ToLowerInvariant();

      switch (outboundProvider)
      {
        case "sendgrid":
          s.Configure<SendGridOptions>(c.GetSection("OutboundEmail"));
          s.AddTransient<IEmailSender, SendGridEmailSender>();
          break;

        case "smtp":
          s.Configure<SmtpOptions>(c.GetSection("OutboundEmail"));
          s.AddTransient<IEmailSender, SmtpEmailSender>();
          break;

        default:
          s.Configure<LocalDiskEmailOptions>(c.GetSection("OutboundEmail"));
          s.AddTransient<IEmailSender, LocalDiskEmailSender>();
          break;
      }

      s
        .AddTransient<TokenIssuingService>()
        .AddTransient<RazorViewService>()
        .AddTransient<AccountEmailService>()
        .AddTransient<DischargeEmailService>()
        .TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();

      return s;
    }
  }
}
