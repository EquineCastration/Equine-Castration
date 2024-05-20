using System.Text.RegularExpressions;
using EquineCastration.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace EquineCastration.Auth;

public static class AuthPolicies
{
  public static AuthorizationPolicy IsWorkerApp
    => new AuthorizationPolicyBuilder()
      .RequireAssertion(HasWorkerToken)
      .Build();

  public static AuthorizationPolicy IsClientApp
    => new AuthorizationPolicyBuilder()
        .RequireAssertion(c=> 
          IsSameHost(c) || HasValidIdentifier(c))
        .Build();

  public static AuthorizationPolicy IsAuthenticatedUser
    => new AuthorizationPolicyBuilder()
        .Combine(IsClientApp)
        .RequireAuthenticatedUser()
        .Build();

 public static AuthorizationPolicy CanManageUsers
    => new AuthorizationPolicyBuilder()
      .Combine(IsAuthenticatedUser)
      .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ManageUsers)
      .Build();

 public static AuthorizationPolicy CanCreateCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.CreateCases)
     .Build();
  
 public static AuthorizationPolicy CanViewOwnCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ViewOwnCases)
     .Build();
 
 public static AuthorizationPolicy CanListOwnCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ListOwnCases)
     .Build();
 
 public static AuthorizationPolicy CanDeleteOwnCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.DeleteOwnCases)
     .Build();
 
 public static AuthorizationPolicy CanCreateCaseSurveys
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.CreateCaseSurveys)
     .Build();
 
 public static AuthorizationPolicy CanListOwnCaseSurveys
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ListOwnCaseSurveys)
     .Build();
 
 public static AuthorizationPolicy CanViewOwnCaseSurveys
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ViewOwnCaseSurveys)
     .Build();
 
 public static AuthorizationPolicy CanGetEligibleSurveyType
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.GetEligibleSurveyType)
     .Build();
 
 private static readonly Func<AuthorizationHandlerContext, bool> HasWorkerToken =
   context =>
   {
     var request = ((DefaultHttpContext?)context.Resource)?.Request;

     var authHeader = request?.Headers.Authorization.FirstOrDefault();
     if (authHeader is null) return false;

     var parts = authHeader.Split(' ');
     if (parts[0] != "Bearer") return false;

     var validToken = request?.HttpContext.RequestServices
       .GetRequiredService<IOptions<WorkerOptions>>()
       .Value
       .ApiKey;

     if (parts[1] != validToken) return false;

     return true;
   };
 
 private static readonly Func<AuthorizationHandlerContext, bool> IsSameHost =
    context =>
    {
      var request = ((DefaultHttpContext?)context.Resource)?.Request;

      // We don't bother checking for same host in a dev environment
      // to facilitate easier testing ;)
      var env = request?.HttpContext.RequestServices
        .GetRequiredService<IHostEnvironment>()
        ?? throw new InvalidOperationException("No Http Request");
      if (env.IsDevelopment()) return true;

      var referer = request?.Headers.Referer.FirstOrDefault();
      if (referer is null) return false;

      // NOTE: this trims the port from the origin
      // which is slightly more lax (same protocol and host, rather than same origin)
      // the following regex is the complete origin: /^http(s?)://[^/\s]*/
      // both regexes also only work safely for a referer header:
      // URLs in other contexts might be formatted differently than the referer header specifies.
      var referringHost = Regex.Match(referer, @"^http(s?)://[^/:\s]*").Value;

      var requestHost = $"{request!.Scheme}://{request!.Host.Host}";

      return requestHost == referringHost;
    };
 
 private static Func<AuthorizationHandlerContext, bool> HasValidIdentifier =>
   context =>
   {
     var request = ((DefaultHttpContext?)context.Resource)?.Request;
     
     var headerOptions = request?.HttpContext.RequestServices
       .GetRequiredService<IOptions<AppRequestHeaderOptions>>()
       .Value;
     
     if (headerOptions is null) return false;
     
     if (!headerOptions.CheckHeader) return true;
     
     var headerName = headerOptions.Name;
     var identifier = request?.Headers[headerName].ToString();

     return identifier == headerOptions.Value;
   };
}
