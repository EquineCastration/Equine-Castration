using Microsoft.AspNetCore.Identity;

namespace EquineCastration.Data.Entities.Identity;

public class Veterinarian
{
  public int Id { get; set; }
  public string? ApplicationUserId { get; set; }
  
  [PersonalData]
  public string Institution { get; set; } = string.Empty;
  
  [PersonalData]
  public bool IsAmbulatory { get; set; }
  
  [PersonalData]
  public int? YearsQualified { get; set; }
  
  public ApplicationUser ApplicationUser { get; set; } = null!;
}
