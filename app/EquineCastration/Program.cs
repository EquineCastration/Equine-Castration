using ClacksMiddleware.Extensions;
using EquineCastration.Extensions;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using EquineCastration.Data;
using EquineCastration.Config;
using EquineCastration.Services;
using EquineCastration.Constants;
using UoN.AspNetCore.VersionMiddleware;
using EquineCastration.Middleware;
using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;

var b = WebApplication.CreateBuilder(args);

#region Configure Services

// MVC
b.Services
  .AddControllersWithViews()
  .AddJsonOptions(DefaultJsonOptions.Configure);

// EF
b.Services
  .AddDbContext<ApplicationDbContext>(o =>
    {
      // migration bundles don't like null connection strings (yet)
      // https://github.com/dotnet/efcore/issues/26869
      // so if no connection string is set we register without one for now.
      // if running migrations, `--connection` should be set on the command line
      // in real environments, connection string should be set via config
      // all other cases will error when db access is attempted.
      var connectionString = b.Configuration.GetConnectionString("Default");
      if (string.IsNullOrWhiteSpace(connectionString))
        o.UseNpgsql();
      else
        o.UseNpgsql(connectionString,
          o => o.EnableRetryOnFailure());
    });

// Identity
b.Services
  .AddIdentity<ApplicationUser, IdentityRole>(
    o => o.SignIn.RequireConfirmedEmail = true)
  .AddClaimsPrincipalFactory<CustomClaimsPrincipalFactory>()
  .AddEntityFrameworkStores<ApplicationDbContext>()
  .AddDefaultTokenProviders();

b.Services
  .AddApplicationInsightsTelemetry()
  .ConfigureApplicationCookie(AuthConfiguration.IdentityCookieOptions)
  .AddAuthorization(AuthConfiguration.AuthOptions)
  .Configure<RegistrationOptions>(b.Configuration.GetSection("Registration"))
  .Configure<UserAccountOptions>(b.Configuration.GetSection("UserAccounts"))
  .Configure<AppDownloadOptions>(b.Configuration.GetSection("AppDownloadUrl"))
  .Configure<WorkerOptions>(b.Configuration.GetSection("Worker"))
  .Configure<AppRequestHeaderOptions>(b.Configuration.GetSection("AppRequestHeader"))

  .AddEmailSender(b.Configuration)

  .AddTransient<AccountService>()
  .AddTransient<UserService>()
  .AddTransient<FeatureFlagService>()
  .AddTransient<RegistrationRuleService>()
  .AddTransient<CaseService>()
  .AddTransient<SurveyService>();

b.Services.AddSwaggerGen();

#endregion

var app = b.Build();

// Do data seeding isolated from the running of the app
using (var scope = app.Services.CreateScope())
{
  var db = scope.ServiceProvider
    .GetRequiredService<ApplicationDbContext>();

  var roles = scope.ServiceProvider
    .GetRequiredService<RoleManager<IdentityRole>>();

  var registrationRule = scope.ServiceProvider
    .GetRequiredService<RegistrationRuleService>();
  
  var config = scope.ServiceProvider
    .GetRequiredService<IConfiguration>();

  var seeder = new DataSeeder(db, roles, registrationRule);

  await seeder.SeedRoles();
  await seeder.SeedRegistrationRules(config);
  await seeder.SeedSurveyTypes();
}

#region Configure Pipeline

app.GnuTerryPratchett();

if (!app.Environment.IsDevelopment())
{
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseVersion();
app.UseConfigCookieMiddleware();
app.UseSwagger();
app.UseSwaggerUI();
#endregion

#region Endpoint Routing

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

// Endpoints

app.MapControllers();

app.MapFallbackToFile("index.html").AllowAnonymous();

#endregion

app.Run();
