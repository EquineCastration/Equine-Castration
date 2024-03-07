using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

using Microsoft.AspNetCore.Identity;
using EquineCastration.Data;
using Microsoft.EntityFrameworkCore;

var host = new HostBuilder()
   // .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((context, s) =>
    {

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
      //s.AddTransient<IReportingService, ReportService>();

    })
    .Build();

host.Run();
