using System.Text.Json;
using EquineCastration.Auth;
using EquineCastration.Data;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Extensions;
using EquineCastration.Models.Account.Email;
using EquineCastration.Models.Account.Login;
using EquineCastration.Models.Account.Password;
using EquineCastration.Models.Account.Register;
using EquineCastration.Models.Account.Token;
using EquineCastration.Models.User;
using EquineCastration.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;
  private readonly SignInManager<ApplicationUser> _signIn;
  private readonly UserService _user;
  private readonly AccountService _account;
  private readonly TokenIssuingService _tokens;
  private readonly ApplicationDbContext _db;

  public AccountController(
    UserManager<ApplicationUser> users,
    SignInManager<ApplicationUser> signIn,
    UserService user,
    AccountService account,
    TokenIssuingService tokens,
    ApplicationDbContext db)

  {
    _users = users;
    _signIn = signIn;
    _user = user;
    _account = account;
    _tokens = tokens;
    _db = db;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register(RegisterAccountModel model)
  {
    RegisterAccountResult regResult = new();

    if (ModelState.IsValid) // Additional Pre-registration checks
    {
      if (!await _user.CanRegister(model.Email))
      {
        ModelState.AddModelError(string.Empty, "The email address provided is not eligible for registration.");
        regResult = regResult with { IsNotAllowlisted = true, };
      }
      
      // check if user already exist
      var user = await _users.FindByEmailAsync(model.Email);
      if (user is not null)
      {
        ModelState.AddModelError(string.Empty, "The email address is already registered.");
        regResult = regResult with { IsExistingUser = true, };
      }
      
      // check if required fields are completed (only applicable to Vet)
      if (model.IsVeterinarian && string.IsNullOrWhiteSpace(model.Institution))
      {
        ModelState.AddModelError(string.Empty, "Missing Institution details");
        regResult = regResult with { IsIncompleteField = true, };
      }
    }

    if (ModelState.IsValid) // Actual success route
    {
      var user = await _users.Users
        .Include(x=>x.Veterinarian)
        .Include(x=>x.Owner)
        .FirstOrDefaultAsync(x => x.Email == model.Email);

      // check if user exist. If yes, then mostly likely user email is not confirmed and 
      // some fields are incomplete, such as full name and password might have not been set.
      if (user is not null) 
      {
        var hashedPassword = _users.PasswordHasher.HashPassword(user, model.Password); // hash the password
        user.PasswordHash = hashedPassword; // update password
        user.FullName = model.FullName; // update user full name
        
        if (model.IsVeterinarian && user.Veterinarian is not null) // if vet
        { 
          user.Veterinarian.Institution = model.Institution;
          user.Veterinarian.IsAmbulatory = model.IsAmbulatory;
          user.Veterinarian.YearsQualified = model.YearsQualified;
        }
        
        await _users.UpdateAsync(user); // update user
       
        var userRoles = await _users.GetRolesAsync(user); // get user roles
        if (userRoles.Count == 0) 
          await _users.AddToRoleAsync(user, 
            model.IsVeterinarian
              ? Roles.Veterinarian : Roles.HorseOwner); // add role if not exist
        
        await _tokens.SendAccountConfirmation(user); // send confirmation email
        return NoContent();
      }
      
      var newUser = new ApplicationUser // Register a new user
      {
        UserName = model.Email,
        Email = model.Email,
        FullName = model.FullName,
        UICulture = Request.GetUICulture().Name
      };

      if (model.IsVeterinarian) // if vet
      {
        newUser.Veterinarian = new Veterinarian
        {
          Institution = model.Institution,
          IsAmbulatory = model.IsAmbulatory,
          YearsQualified = model.YearsQualified
        };
      }
      else 
      {
        var existingOwner = await _db.Owners.FirstOrDefaultAsync(x => x.Email == model.Email);

        newUser.Owner = existingOwner ?? new Owner { Email = model.Email }; // use existing owner or create new owner
      }
      
      var result = await _users.CreateAsync(newUser, model.Password);
      if (result.Succeeded)
      {
        await _users.AddToRoleAsync(newUser, 
          model.IsVeterinarian
            ? Roles.Veterinarian : Roles.HorseOwner); // assign role
        
        await _db.SaveChangesAsync();
        
        await _tokens.SendAccountConfirmation(newUser);
        
        await _signIn.SignInAsync(newUser, false); // sign in the new user

        var profile = await _user.BuildProfile(newUser);

        // Write a basic Profile Cookie for JS
        HttpContext.Response.Cookies.Append(
          AuthConfiguration.ProfileCookieName,
          JsonSerializer.Serialize((BaseUserProfileModel)profile),
          AuthConfiguration.ProfileCookieOptions);

        return Ok(profile);
      }

      foreach (var e in result.Errors)
        ModelState.AddModelError(string.Empty, e.Description);
    }
    
    return BadRequest(regResult with { Errors = ModelState.CollapseErrors() });
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login(LoginModel model)
  {
    if (ModelState.IsValid)
    {
      var result = await _signIn.PasswordSignInAsync(model.Username, model.Password, false, true);
      var user = await _users.FindByNameAsync(model.Username);

      if (result.Succeeded)
      {
        if (user is null)
          throw new InvalidOperationException(
            $"Successfully signed in user could not be retrieved! Username: {model.Username}");

        var profile = await _user.BuildProfile(user);

        // Write a basic Profile Cookie for JS
        HttpContext.Response.Cookies.Append(
          AuthConfiguration.ProfileCookieName,
          JsonSerializer.Serialize((BaseUserProfileModel)profile),
          AuthConfiguration.ProfileCookieOptions);

        return Ok(new LoginResult
        {
          User = profile,
        });
      }

      // Handle login failures
      if (result.IsNotAllowed)
      {
        // But WHY was it disallowed?
        // Distinguish some specific cases we care about
        // So the login form can behave accordingly

        LoginResult loginResult = user switch
        {
          { EmailConfirmed: false } => new() { IsUnconfirmedAccount = true },
          _ => new() { }
        };

        return BadRequest(loginResult);
      }
    }

    return BadRequest(new LoginResult
    {
      Errors = ModelState.CollapseErrors()
    });
  }

  [HttpPost("logout")]
  public async Task Logout()
  {
    // Sign out of Identity
    await _signIn.SignOutAsync();

    // Also remove the JS Profile Cookie
    HttpContext.Response.Cookies.Delete(AuthConfiguration.ProfileCookieName);
  }

  [HttpPost("confirm")]
  public async Task<IActionResult> Confirm(UserTokenModel model)
  {
    if (ModelState.IsValid)
    {
      var user = await _users.FindByIdAsync(model.UserId);
      if (user is null) return NotFound();

      var result = await _users.ConfirmEmailAsync(user, model.Token);

      if (!result.Errors.Any())
      {
        await _signIn.SignInAsync(user, false);

        var profile = await _user.BuildProfile(user);

        // Write a basic Profile Cookie for JS
        HttpContext.Response.Cookies.Append(
          AuthConfiguration.ProfileCookieName,
          JsonSerializer.Serialize((BaseUserProfileModel)profile),
          AuthConfiguration.ProfileCookieOptions);

        return Ok(profile);
      }
    }

    return BadRequest();
  }

  [HttpPost("confirm/resend")]
  public async Task<IActionResult> ConfirmResend([FromBody] string userIdOrEmail)
  {
    var user = await _users.FindByIdAsync(userIdOrEmail);
    if (user is null) user = await _users.FindByEmailAsync(userIdOrEmail);
    if (user is null) return NotFound();

    // Check if user is only pending for email confirmation
    if (user.EmailConfirmed)
      return BadRequest();
      
    await _tokens.SendAccountConfirmation(user); // send confirmation email if email confirmation pending
    return NoContent();
  }

  [HttpPost("password/reset")]
  public async Task<IActionResult> RequestPasswordReset([FromBody] string userIdOrEmail)
  {
    var user = await _users.FindByIdAsync(userIdOrEmail);
    if (user is null) user = await _users.FindByEmailAsync(userIdOrEmail);
    if (user is null) return NotFound();

    await _tokens.SendPasswordReset(user);
    return NoContent();
  }

  [HttpPost("password")]
  public async Task<IActionResult> ResetPassword(AnonymousSetPasswordModel model)
  {
    if (ModelState.IsValid)
    {
      var user = await _users.FindByIdAsync(model.Credentials.UserId);
      if (user is null) return NotFound();

      var result = await _users.ResetPasswordAsync(user, model.Credentials.Token, model.Data.Password);

      if (!result.Errors.Any())
      {
        if (user.EmailConfirmed)
        {
          await _signIn.SignInAsync(user, false);

          var profile = await _user.BuildProfile(user);

          // Write a basic Profile Cookie for JS
          HttpContext.Response.Cookies.Append(
            AuthConfiguration.ProfileCookieName,
            JsonSerializer.Serialize((BaseUserProfileModel)profile),
            AuthConfiguration.ProfileCookieOptions);

          return Ok(new SetPasswordResult
          {
            User = profile
          });
        }
        else
        {
          return Ok(new SetPasswordResult
          {
            IsUnconfirmedAccount = true
          });
        }
      }
    }

    return BadRequest(new SetPasswordResult
    {
      Errors = ModelState.CollapseErrors()
    });
  }
  
  /// <summary>
  /// Update user's email
  /// User must have confirmed email before their email can be changed
  /// If user has not confirmed their email, this suggests user's account is not active yet
  /// </summary>
  /// <param name="model">userId, NewEmail and ChangeEmail token</param>
  /// <returns></returns>
  [HttpPost("confirmEmailChange")]
  public async Task<IActionResult> ConfirmEmailChange(AnonymousSetEmailModel model)
  {
    if (ModelState.IsValid)
    {
      var user = await _users.FindByIdAsync(model.Credentials.UserId);
      if (user is null) return NotFound();
      
      if (!user.EmailConfirmed) // user must have confirmed email before their email can be changed 
        return BadRequest(new SetEmailResult { IsUnconfirmedAccount = true }); 
      
      var result = await _users.ChangeEmailAsync(user, model.Data.NewEmail, model.Credentials.Token); // change email using token and new email

      if (!result.Errors.Any())
      {
        user.UserName = model.Data.NewEmail; 
        await _users.UpdateAsync(user); // update username to new email
        
        await _signIn.SignInAsync(user, false);

        var profile = await _user.BuildProfile(user);

        // Write a basic Profile Cookie for JS
        HttpContext.Response.Cookies.Append(
          AuthConfiguration.ProfileCookieName,
          JsonSerializer.Serialize((BaseUserProfileModel)profile),
          AuthConfiguration.ProfileCookieOptions);

        return Ok(new SetEmailResult { User = profile });
      }
    }
    return BadRequest(new SetEmailResult { Errors = ModelState.CollapseErrors() });
  }

  /// <summary>
  /// Email user a token to confirm the deletion of their account
  /// </summary>
  /// <param name="userIdOrEmail"></param>
  /// <returns></returns>
  [HttpPost("delete")]
  public async Task<IActionResult> RequestAccountDelete([FromBody] string userIdOrEmail)
  {
    var user = await _users.FindByIdAsync(userIdOrEmail) ?? await _users.FindByEmailAsync(userIdOrEmail);
    if (user is null) return NoContent(); // don't want to reveal if user exist or not

    await _tokens.SendAccountDelete(user);
    return NoContent();
  }

  /// <summary>
  /// Delete user account and all the cases they are associated with including horses.
  /// </summary>
  /// <param name="model"> userId and token </param>
  /// <returns></returns>
  [HttpPost("confirm/delete")]
  public async Task<IActionResult> ConfirmDelete(UserTokenModel model)
  {
    if (!ModelState.IsValid) return BadRequest();
    var user = await _users.FindByIdAsync(model.UserId);
    if (user is null) return NotFound();

    var isTokenValid = await _users
      .VerifyUserTokenAsync(user, "Default", "DeleteAccount", model.Token);

    if (!isTokenValid) return BadRequest();

    const int max = 3; // max number of retries
    for (var x = 0; x < max; x++)
    {
      try
      {
        await _account.Delete(user.Id);
        return NoContent();
      }
      catch (KeyNotFoundException)
      {
        return NotFound();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (x == max - 1) return Conflict();
        await Task.Delay(200); // wait before retrying
      }
    }
    
    // should not reach here but just in case
    return StatusCode(500, "An unexpected error occurred while trying to delete the user.");
  }
}
