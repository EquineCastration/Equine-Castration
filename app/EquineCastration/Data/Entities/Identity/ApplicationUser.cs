using Microsoft.AspNetCore.Identity;

namespace EquineCastration.Data.Entities.Identity;

public class ApplicationUser : IdentityUser
{
  [PersonalData]
  public string FullName { get; set; } = string.Empty;

  [PersonalData]
  public string UICulture { get; set; } = string.Empty;
  
  [PersonalData]
  public Veterinarian? Veterinarian { get; set; }
  
  [PersonalData]
  public Owner? Owner { get; set; }
}
