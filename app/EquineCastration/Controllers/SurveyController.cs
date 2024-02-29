using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Survey;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SurveyController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private SurveyService _survey;

  public SurveyController(UserManager<ApplicationUser> users, SurveyService survey)
  {
    _users = users;
    _survey = survey;
  }

  [Authorize(nameof(AuthPolicies.CanListOwnCaseSurveys))]
  [HttpGet("ListByCase/{caseId}")]
  public async Task<ActionResult> List(int caseId)
  {
    var userId = _users.GetUserId(User);
    if (userId is null || await _survey.IsCaseAuthorOrOwner(userId, caseId))
      return Forbid();
    return Ok(await _survey.ListByCase(userId, caseId));
  }

  /// <summary>
  /// Create a new survey for a case.
  /// Multiple survey of same type for a case is not allowed.
  /// Only, owners can create survey for a case.
  /// </summary>
  /// <param name="model"></param>
  /// <returns></returns>
  [Authorize(nameof(AuthPolicies.CanCreateCaseSurveys))]
  [HttpPost]
  public async Task<ActionResult> Create(CreateSurveyModel model)
  {
    var userId = _users.GetUserId(User);
    if (userId is null || await _survey.IsCaseAuthorOrOwner(userId, model.CaseId))
      return Forbid();
    try
    {
      return Ok(await _survey.Create(model));
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
  }
}