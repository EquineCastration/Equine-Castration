using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Data.Models;
using EquineCastration.Models.Survey;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SurveysController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private SurveyService _survey;

  public SurveysController(UserManager<ApplicationUser> users, SurveyService survey)
  {
    _users = users;
    _survey = survey;
  }

  /// <summary>
  /// List all surveys for a case.
  /// </summary>
  /// <param name="caseId"> Id of the case </param>
  /// <returns></returns>
  [Authorize(nameof(AuthPolicies.CanListOwnCaseSurveys))]
  [HttpGet("ListByCase/{caseId}")]
  public async Task<ActionResult> List(int caseId)
  {
    var userId = _users.GetUserId(User);
    if (userId is null || !await _survey.IsCaseAuthorOrOwner(userId, caseId))
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
    if (userId is null || !await _survey.IsCaseAuthorOrOwner(userId, model.CaseId))
      return Forbid();
    try
    {
      return Ok(await _survey.Create(model));
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
    catch (InvalidOperationException)
    {
      return BadRequest();
    }
  }

  /// <summary>
  /// Sends a notification to the owner of the case.
  /// </summary>
  /// <param name="model"></param>
  /// <returns></returns>
  [AllowAnonymous]
  [HttpPost("SendSurveyNotification")]
  public async Task<ActionResult> SendSurveyNotification(NewSurveyNotificationModel model)
  {
    Console.WriteLine("Sending survey notification");
    await _survey.SendOwnerSurveyNotification(model);

    return NoContent();
  }
  
  /// <summary>
  /// Get eligible survey type for creation for a case.
  /// Case discharge date is used to determine the eligible survey type.
  /// Also, doesn't include the survey types already created for the case.
  /// Only, owners can get eligible survey type for a case.
  /// </summary>
  /// <param name="caseId"> Id of the case </param>
  /// <returns></returns>
  [Authorize(nameof(AuthPolicies.CanGetEligibleSurveyType))]
  [HttpGet("EligibleSurveyType/{caseId}")]
  public async Task<ActionResult> GetEligibleSurveyTypeForCreation(int caseId)
  {
    var userId = _users.GetUserId(User);
    if (userId is null || !await _survey.IsCaseAuthorOrOwner(userId, caseId))
      return Forbid();
    try
    {
      var result = await _survey.GetEligibleSurveyTypeForCreation(caseId);
      return result is not null
        ? Ok(result)
        : Ok();
    }
    catch (KeyNotFoundException)
    {
      return NotFound();
    }
    catch (InvalidOperationException)
    {
      return BadRequest();
    }
  }
}
