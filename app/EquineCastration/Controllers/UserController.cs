using System.Globalization;
using System.Text.Json;
using EquineCastration.Auth;
using EquineCastration.Data.Entities;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.User;
using EquineCastration.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private readonly SignInManager<ApplicationUser> _signIn;
  private readonly UserService _user;

  public UserController(
    UserManager<ApplicationUser> users,
    SignInManager<ApplicationUser> signIn,
    UserService user)
  {
    _users = users;
    _signIn = signIn;
    _user = user;
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
}

