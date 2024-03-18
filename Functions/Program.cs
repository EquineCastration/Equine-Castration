using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using EquineCastration.Data;
using Microsoft.EntityFrameworkCore;
using Functions.Services;
using Functions.Services.Contracts;
using Functions.Config;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((context, s) =>
    {

      // Adds a named client that uses the token management 
      var apiConfig = context.Configuration.GetSection("Backend").Get<SiteOptions>();

      s.AddClientAccessTokenHttpClient("client", configureClient: client =>
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
