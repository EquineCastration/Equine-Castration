using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace EquineCastration.Auth;

public static class AuthConfiguration
{
  public static readonly string ProfileCookieName = ".EquineCastration.Profile";
  public static readonly string IdentityCookieName = ".EquineCastration.Identity";

  public static readonly CookieOptions ProfileCookieOptions = new()
  {
    // Most actual COOKIE settings between Profile and Identity Cookies should match

    IsEssential = true,
    SameSite = SameSiteMode.Lax, // In Identity, `Lax` is default

    // This is the key difference to IdentityCookie; this one is INTENDED to be read by JS :)
    HttpOnly = false, // In Identity `true` is default
  };

  public static readonly Action<CookieAuthenticationOptions> IdentityCookieOptions =
    o =>
    {
      o.Cookie.Name = IdentityCookieName;

      o.Cookie.IsEssential = true;

      o.ExpireTimeSpan = TimeSpan.FromDays(30);

      o.SlidingExpiration = true;

      // While we are using Cookie Auth,
      // all requests to the backend are expected to be headless,
      // so interactive auth flow isn't helpful to us
      o.Events.OnRedirectToLogin = context =>
      {
        context.Response.Headers["Location"] = context.RedirectUri;
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
      };

      o.Events.OnRedirectToAccessDenied = context =>
      {
        context.Response.Headers["Location"] = context.RedirectUri;
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
      };
    };

  public static readonly Action<AuthorizationOptions> AuthOptions =
    b =>
    {
      // This is used when no specific authorisation details are specified
      // (e.g. [Authorize] or [AllowAnonymous])
      // Nothing in SargAssure (at this time) should use [AllowAnonymous]
      b.FallbackPolicy = AuthPolicies.IsClientApp;

      // This is used when `[Authorize]` is provided with no specific policy / config
      b.DefaultPolicy = AuthPolicies.IsAuthenticatedUser;
      
      b.AddPolicy(nameof(AuthPolicies.IsWorkerApp), AuthPolicies.IsWorkerApp);
      
      b.AddPolicy(nameof(AuthPolicies.CanManageUsers), AuthPolicies.CanManageUsers);
      b.AddPolicy(nameof(AuthPolicies.CanCreateCases), AuthPolicies.CanCreateCases); 
      b.AddPolicy(nameof(AuthPolicies.CanViewOwnCases), AuthPolicies.CanViewOwnCases);
      b.AddPolicy(nameof(AuthPolicies.CanListOwnCases), AuthPolicies.CanListOwnCases);
      b.AddPolicy(nameof(AuthPolicies.CanDeleteOwnCases), AuthPolicies.CanDeleteOwnCases);
      
      b.AddPolicy(nameof(AuthPolicies.CanCreateCaseSurveys), AuthPolicies.CanCreateCaseSurveys);
      b.AddPolicy(nameof(AuthPolicies.CanListOwnCaseSurveys), AuthPolicies.CanListOwnCaseSurveys);
      b.AddPolicy(nameof(AuthPolicies.CanViewOwnCaseSurveys), AuthPolicies.CanViewOwnCaseSurveys);
      b.AddPolicy(nameof(AuthPolicies.CanGetEligibleSurveyType), AuthPolicies.CanGetEligibleSurveyType);
    };


}
