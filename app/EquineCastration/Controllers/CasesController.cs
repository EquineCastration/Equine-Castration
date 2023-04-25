using EquineCastration.Auth;
using EquineCastration.Data.Entities.Identity;
using EquineCastration.Models.Case;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EquineCastration.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CasesController : ControllerBase
{
  private readonly UserManager<ApplicationUser> _users;

  public CasesController(UserManager<ApplicationUser> users)
  {
    _users = users;
  }
  
}
