using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

namespace EquineCastration.Auth;

public static class AuthPolicies
{
  public static AuthorizationPolicy IsClientApp
    => new AuthorizationPolicyBuilder()
        .RequireAssertion(IsSameHost)
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
 
 public static AuthorizationPolicy CanViewAllCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ViewAllCases)
     .Build();
 
 public static AuthorizationPolicy CanListAllCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ListAllCases)
     .Build();
 
 public static AuthorizationPolicy CanEditAllCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.EditAllCases)
     .Build();
 
 public static AuthorizationPolicy CanDeleteAllCases
   => new AuthorizationPolicyBuilder()
     .Combine(IsAuthenticatedUser)
     .RequireClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.DeleteAllCases)
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
}
