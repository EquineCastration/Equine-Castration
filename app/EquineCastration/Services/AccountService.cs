using EquineCastration.Data;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Emails;
using EquineCastration.Services.EmailServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EquineCastration.Services;

public class AccountService
{
  private readonly ApplicationDbContext _db;
  private readonly UserManager<ApplicationUser> _users;
  private readonly AccountEmailService _accountEmail;
  private readonly CaseService _cases;


  public AccountService(
    ApplicationDbContext db,
    UserManager<ApplicationUser> users,
    AccountEmailService accountEmail,
    CaseService cases)
  {
    _db = db;
    _users = users;
    _accountEmail = accountEmail;
    _cases = cases;
  }

  public async Task Delete(string userId)
  {
    var user = await _users.Users
      .Include(x => x.Veterinarian)
      .Include(x => x.Owner)
      .FirstOrDefaultAsync(x => x.Id == userId);
    if (user is null) throw new KeyNotFoundException();

    await _cases.DeleteUserCases(user.Id);
    
    // only applicable to owner
    var horses = await _db.Horses
      .Where(x => x.Owner.ApplicationUserId == user.Id)
      .ToListAsync();
    _db.Horses.RemoveRange(horses);
    
    await _users.DeleteAsync(user);
    if (user.Email is not null)
      await _accountEmail.SendDeleteUpdate(new EmailAddress(user.Email) { Name = user.FullName });
  }
}
