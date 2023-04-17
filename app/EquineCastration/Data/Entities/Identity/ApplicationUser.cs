using Microsoft.AspNetCore.Identity;

namespace EquineCastration.Data.Entities.Identity;

public class ApplicationUser : IdentityUser
{
  [PersonalData]
  public string FullName { get; set; } = string.Empty;

  [PersonalData]
  public string UICulture { get; set; } = string.Empty;
  
  [PersonalData]
  public string Institution { get; set; } = string.Empty;
  
  [PersonalData]
  public bool IsAmbulatory { get; set; }
  
  [PersonalData]
  public int? YearsQualified { get; set; }
}
