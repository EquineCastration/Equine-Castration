using EquineCastration.Data;
using Functions.Config;
using Functions.Services;
using Functions.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
  .ConfigureAppConfiguration(c =>
  {
    c.AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);
  })
  .ConfigureFunctionsWorkerDefaults()
  .ConfigureServices((context, s) =>
  {

    // Adds a named client that uses the token management 
    var apiConfig = context.Configuration.GetSection("Backend").Get<SiteOptions>();

    s.AddHttpClient("client", configureClient: client =>
    {
      client.BaseAddress = new Uri(apiConfig?.ApiUrl ?? throw new InvalidOperationException());
    });

    s.AddDbContext<ApplicationDbContext>(o =>
    {
      var connectionString = context.Configuration.GetConnectionString("Default");
      if (string.IsNullOrWhiteSpace(connectionString))
        o.UseNpgsql();
      else
        o.UseNpgsql(connectionString,
          o => o.EnableRetryOnFailure());
    });

    //Services here
    s.AddTransient<ISurveyService, SurveyService>();

  })
  .Build();

host.Run();
