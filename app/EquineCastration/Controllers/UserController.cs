using System.Globalization;
using System.Text.Json;
using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Emails;
using EquineCastration.Services.EmailServices;
using EquineCastration.Models.User;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private readonly SignInManager<ApplicationUser> _signIn;
  private readonly UserService _user;
  private readonly AccountEmailService _accountEmail;
  private readonly CaseService _cases;

  public UserController(
    UserManager<ApplicationUser> users,
    SignInManager<ApplicationUser> signIn,
    UserService user,
    AccountEmailService accountEmail,
    CaseService cases)
  {
    _users = users;
    _signIn = signIn;
    _user = user;
    _accountEmail = accountEmail;
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
  /// Delete user account and all their authored cases
  /// </summary>
  [HttpDelete("me")]
  public async Task<IActionResult> Delete ()
  {
    var user = await _users.Users
      .Include(x => x.Veterinarian)
      .Include(x => x.Owner)
      .FirstOrDefaultAsync(x => x.Id == _users.GetUserId(User));
    if (user is null) return NotFound();

    await _cases.DeleteAuthorAllCases(user.Id);
    await _users.DeleteAsync(user);
    await _accountEmail.SendDeleteUpdate(new EmailAddress(user.Email){ Name = user.FullName });
    return NoContent();
  }
}

