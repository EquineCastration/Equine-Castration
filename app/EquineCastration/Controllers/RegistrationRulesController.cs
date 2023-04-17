using EquineCastration.Auth;
using EquineCastration.Models;
using EquineCastration.Models.RegistrationRule;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistrationRulesController : ControllerBase
{
  private readonly RegistrationRuleService _registrationRules;
  private readonly UserService _user;
  
  public RegistrationRulesController(
    RegistrationRuleService registrationRules,
    UserService user
    )
  {
    _registrationRules = registrationRules;
    _user = user;
  }
  
  /// <summary>
  /// Get Registration rules list
  /// </summary>
  /// <returns>Registration rules list</returns>
  [HttpGet]
  [Authorize(nameof(AuthPolicies.CanManageUsers))]
  public async Task<List<RegistrationRuleModel>> List() 
    => await _registrationRules.List();


  /// <summary>
  /// Get registration rule based on rule id
  /// </summary>
  /// <param name="id">Rule id to get</param>
  /// <returns>Registration rules associated with the value</returns>
  [HttpGet("{id}")]
  [Authorize(nameof(AuthPolicies.CanManageUsers))]
  public async Task<RegistrationRuleModel> Get(int id)
  => await _registrationRules.Get(id);
  
  
  /// <summary>
  /// Delete registration rule
  /// </summary>
  /// <param name="id">Rule id to delete</param>
  /// <returns></returns>
  [HttpDelete("{id}")]
  [Authorize(nameof(AuthPolicies.CanManageUsers))]
  public async Task<ActionResult> Delete(int id)
  {
    try
    {
      await _registrationRules.Delete(id);
      return NoContent();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }
  
  
  /// <summary>
  /// Create registration rule or update if value already exists
  /// </summary>
  /// <param name="model">Rule data</param>
  /// <returns></returns>
  [HttpPost]
  [Authorize(nameof(AuthPolicies.CanManageUsers))]
  public async Task<ActionResult> Create(CreateRegistrationRuleModel model)
  {
    return Ok(await _registrationRules.Create(model));
  }
  
  
  /// <summary>
  /// Update registration rule
  /// </summary>
  /// <param name="id">Rule id to update</param>
  /// <param name="model">Rule update data</param>
  /// <returns></returns>
  [HttpPut("{id}")]
  [Authorize(nameof(AuthPolicies.CanManageUsers))]
  public async Task<ActionResult> Set(int id, [FromBody] CreateRegistrationRuleModel model)
  {
    try
    {
      return Ok(await _registrationRules.Set(id, model));
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }

  /// <summary>
  /// Get Minimal Registration rules list i.e. get rule value and its status
  /// </summary>
  /// <returns>Minimal Registration rules list</returns>
  [HttpGet("minimal")]
  public async Task<List<RegistrationRuleModel>> MinimalList()
  {
    var rules = await _registrationRules.List();
    
    return rules.ConvertAll<RegistrationRuleModel>(x =>
      new RegistrationRuleModel { Value = x.Value, IsBlocked = x.IsBlocked, });
  }

  /// <summary>
  /// Get email validation result
  /// </summary>
  /// <param name="email">email to validate</param>
  /// <returns>Validation outcome</returns>
  [HttpPost("validate")]
  public async Task<ActionResult> ValidateEmail([FromBody] string email)
  {
    return Ok(new ValidationResult
      {
        IsValid = await _user.CanRegister(email)
      }
    );
  }
}
