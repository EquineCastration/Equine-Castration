using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Data.Entities;

public class Horse
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Breed { get; set; } = string.Empty;
  public string? BreedOther { get; set; }
  public int Weight { get; set; }
  public int Age { get; set; }
  public string OwnershipLength { get; set; } = string.Empty;
  public bool IsClinicallyHealthy { get; set; }
  public string IsClinicallyHealthyNo { get; set; } = string.Empty;
  public bool IsOnMedication { get; set; }
  public string IsOnMedicationYes { get; set; } = string.Empty;
  public string LocationTesticleLeft { get; set; } = string.Empty;
  public string LocationTesticleRight { get; set; } = string.Empty;
  public DateTimeOffset DateOfCastration { get; set; }
  public Owner Owner { get; set; } = null!;
}
