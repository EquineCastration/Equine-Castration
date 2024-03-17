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
  
  if (user.Owner is not null) _db.Owners.Remove(user.Owner);
  if (user.Veterinarian is not null) _db.Veterinarians.Remove(user.Veterinarian);
  await _users.DeleteAsync(user);

  await _db.SaveChangesAsync();

  if (user.Email is not null)
    await _accountEmail.SendDeleteUpdate(new EmailAddress(user.Email) { Name = user.FullName });
}
}
