using System.Globalization;
using System.Text.Json;
using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Emails;
using EquineCastration.Models.User;
using EquineCastration.Services;
using EquineCastration.Services.EmailServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private readonly SignInManager<ApplicationUser> _signIn;
  private readonly AccountEmailService _accountEmail;
  private readonly UserService _user;
  private readonly CaseService _cases;

  public UserController(
    UserManager<ApplicationUser> users,
    SignInManager<ApplicationUser> signIn,
    AccountEmailService accountEmail,
    UserService user,
    CaseService cases)
  {
    _users = users;
    _signIn = signIn;
    _accountEmail = accountEmail;
    _user = user;
    _cases = cases;
  }

  [HttpGet("me")]
  public async Task<IActionResult> Me()
  {
    var profile = await _user.BuildProfile(User);
    return Ok(profile);
  }

  [HttpPut("uiCulture")]
  public async Task<IActionResult> SetUICulture([FromBody] string culture)
  {
    try
    {
      var user = await _users.FindByNameAsync(User.Identity?.Name);

      // Save it
      await _user.SetUICulture(user.Id, culture);

      // Sign In again to reset user cookie
      await _signIn.SignInAsync(user, false);

      var profile = await _user.BuildProfile(user);

      // Write a basic Profile Cookie for JS
      HttpContext.Response.Cookies.Append(
        AuthConfiguration.ProfileCookieName,
        JsonSerializer.Serialize((BaseUserProfileModel)profile),
        AuthConfiguration.ProfileCookieOptions);
    }
    catch (KeyNotFoundException) { return NotFound(); }
    catch (CultureNotFoundException) { return BadRequest(); }

    return NoContent();
  }
  
  /// <summary>
  /// Delete cases authored by the user and their account
  /// </summary>
  [HttpDelete("me")]
  public async Task<IActionResult> Delete ()
  {
    var user = await _users.FindByIdAsync(_users.GetUserId(User));
    if (user is null) return NotFound();

    await _cases.DeleteAuthorAllCases(user.Id);
    await _users.DeleteAsync(user);
    await _accountEmail.SendDeleteUpdate(new EmailAddress(user.Email){ Name = user.FullName });
    return NoContent();
  }
}

