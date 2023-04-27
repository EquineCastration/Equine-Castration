using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Case;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private readonly CaseService _cases;

  public CasesController(UserManager<ApplicationUser> users, CaseService cases)
  {
    _users = users;
    _cases = cases;

  }

  [HttpGet]
  public async Task<List<CaseModel>> List()
  {
    if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ListAllCases))
      return await _cases.ListAll();
    
    return await _cases.List(_users.GetUserId(User));
  }
  
  
  [Authorize(nameof(AuthPolicies.CanCreateCases))]
  [HttpPost]
  public async Task<ActionResult> Create(CreateCaseModel model)
  {
    return Ok(await _cases.Create(model, _users.GetUserId(User)));
  }
  
  [HttpGet("{id}")]
  public async Task<ActionResult> Get(int id)
  {
    try
    {
      if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ViewAllCases))
        return Ok(await _cases.Get(id));
      
      if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.ViewOwnCases))
        return Ok(await _cases.GetAuthorCase(_users.GetUserId(User), id));

      return BadRequest();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }
  
  [HttpPut("{id}")]
  public async Task<ActionResult> Edit(int id, [FromBody] CreateCaseModel caseUpdate)
  {
    try
    {
      if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.EditAllCases))
        return Ok(await _cases.Edit(id, caseUpdate));

      if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.EditOwnCases))
        return Ok(await _cases.EditAuthorCase(id, caseUpdate, _users.GetUserId(User)));
      
      return BadRequest();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
    
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(int id)
  {
    try
    {
      if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.DeleteAllCases))
        await _cases.Delete(id); 
      
      if (User.HasClaim(CustomClaimTypes.SitePermission, SitePermissionClaims.DeleteOwnCases))
        await _cases.DeleteAuthorCase(id, _users.GetUserId(User));
      
      return BadRequest();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }
}
