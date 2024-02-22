using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Case;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Authorize]
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

  [Authorize(nameof(AuthPolicies.CanListOwnCases))]
  [HttpGet]
  public async Task<ActionResult<List<CaseModel>>> List()
  {
    var userId = _users.GetUserId(User);
    if (userId is null) return Forbid();
    return Ok(await _cases.List(userId));
  }
  
  [Authorize(nameof(AuthPolicies.CanCreateCases))]
  [HttpPost]
  public async Task<ActionResult> Create(CreateCaseModel model)
  {
    var userId = _users.GetUserId(User);
    if (userId is null) return Forbid();
    return Ok(await _cases.Create(model, userId));
  }
  
  [Authorize(nameof(AuthPolicies.CanViewOwnCases))]
  [HttpGet("{id}")]
  public async Task<ActionResult> Get(int id)
  {
    try
    {
      var userId = _users.GetUserId(User);
      if (userId is null) return Forbid();
      return Ok(await _cases.GetAuthorCase(userId, id));
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }
  
  [Authorize(nameof(AuthPolicies.CanViewOwnCases))]
  [HttpPut("{id}")]
  public async Task<ActionResult> Edit(int id, [FromBody] CreateCaseModel caseUpdate)
  {
    try
    {
      var userId = _users.GetUserId(User);
      if (userId is null) return Forbid();
      return Ok(await _cases.EditAuthorCase(id, caseUpdate, userId));
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }

  [Authorize(nameof(AuthPolicies.CanDeleteOwnCases))]
  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete(int id)
  {
    try
    {
      var userId = _users.GetUserId(User);
      if (userId is null) return Forbid();
      await _cases.DeleteAuthorCase(id, userId);
      return Ok();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }
}
