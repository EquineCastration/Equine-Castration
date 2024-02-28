using System.Security.Claims;
using EquineCastration.Auth;
using EquineCastration.Constants;
using EquineCastration.Data.Entities;
using EquineCastration.Models;
using EquineCastration.Models.RegistrationRule;
using EquineCastration.Models.Survey;
using EquineCastration.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Data;

public class DataSeeder
{
  private readonly ApplicationDbContext _db;
  private readonly RoleManager<IdentityRole> _roles;
  private readonly RegistrationRuleService _registrationRule;

  public DataSeeder(
    ApplicationDbContext db,
    RoleManager<IdentityRole> roles,
    RegistrationRuleService registrationRule)
  {
    _db = db;
    _roles = roles;
    _registrationRule = registrationRule;
  }
 
  /// <summary>
  /// Ensure an individual role exists and has the specified claims
  /// </summary>
  /// <param name="roleName">The name of the role to ensure is present</param>
  /// <param name="claims">The claims the role should have</param>
  /// <returns></returns>
  private async Task SeedRole(string roleName, List<(string type, string value)> claims)
  {
    var role = await _roles.FindByNameAsync(roleName);

    // create the role if it doesn't exist
    if (role is null)
    {
      role = new IdentityRole { Name = roleName };
      await _roles.CreateAsync(role);
    }

    // ensure the role has the claims specified
    //turning this into a dictionary gives us key indexing, not needing to repeatedly enumerate the list
    var existingClaims = (await _roles.GetClaimsAsync(role)).ToDictionary(x => $"{x.Type}{x.Value}");
    foreach (var (type, value) in claims)
    {
      // only add the claim if the role doesn't already functionally have it
      if (!existingClaims.ContainsKey($"{type}{value}"))
        await _roles.AddClaimAsync(role, new Claim(type, value));
    }
  }

  public async Task SeedRoles()
  {
    // Vet
    await SeedRole(Roles.Veterinarian, new()
    {
      (CustomClaimTypes.SitePermission, SitePermissionClaims.CreateCases),
      (CustomClaimTypes.SitePermission, SitePermissionClaims.EditOwnCases),
      (CustomClaimTypes.SitePermission, SitePermissionClaims.DeleteOwnCases),
      (CustomClaimTypes.SitePermission, SitePermissionClaims.ListOwnCases),
      (CustomClaimTypes.SitePermission, SitePermissionClaims.ViewOwnCases),
    });
    
    // Horse owner
    await SeedRole(Roles.HorseOwner, new()
    {
      (CustomClaimTypes.SitePermission, SitePermissionClaims.ListOwnCases),
      (CustomClaimTypes.SitePermission, SitePermissionClaims.ViewOwnCases),
    });
    
  }
  
  /// <summary>
  /// Seed an initials set of registration rules (allow and block lists)
  /// </summary>
  /// <param name="config"></param>
  public async Task SeedRegistrationRules(IConfiguration config)
  {
    await UpdateRegistrationRules("Registration:AllowList", config, false); // allow list
    await UpdateRegistrationRules("Registration:BlockList", config, true); // block list
  }
  /// <summary>
  /// Helper function for the SeedRegistrationRules method
  /// </summary>
  /// <param name="key">Config key</param>
  /// <param name="config"></param>
  /// <param name="isBlocked">Values blocked if true or else allowed</param>
  private async Task UpdateRegistrationRules(string key, IConfiguration config, bool isBlocked)
  {
    var configuredList = config.GetSection(key)?
      .GetChildren()?
      .Select(x => x.Value)?
      .ToList();

    if (configuredList is not null && configuredList.Count >= 1)
    {
      foreach (var value in configuredList)
        if (!string.IsNullOrWhiteSpace(value)) // only add value if not empty
          await _registrationRule.Create(new CreateRegistrationRuleModel(value, isBlocked));

    }
  }
  
  /// <summary>
  /// Seeds the survey types
  /// </summary>
  /// <returns></returns>
  public async Task SeedSurveyTypes()
  {
    var inputList = new List<CreateSurveyTypeModel>
    {
      new CreateSurveyTypeModel (SurveyTypes.PostDayOne),
      new CreateSurveyTypeModel (SurveyTypes.PostDayThree),
      new CreateSurveyTypeModel (SurveyTypes.PostDayFive),
      new CreateSurveyTypeModel (SurveyTypes.PostDaySeven),
      new CreateSurveyTypeModel (SurveyTypes.PostDayFourteen),
      new CreateSurveyTypeModel (SurveyTypes.PostMonthThree),
    };

    foreach (var inputType in inputList)
    {
      var isExistingValue = await _db.SurveyTypes
        .Where(x => EF.Functions.ILike(x.Name, inputType.Name))
        .FirstOrDefaultAsync();

      if (isExistingValue is not null) continue;
      var entity = new SurveyType { Name = inputType.Name };
      await _db.SurveyTypes.AddAsync(entity);
      await _db.SaveChangesAsync();
    }
  }
}
