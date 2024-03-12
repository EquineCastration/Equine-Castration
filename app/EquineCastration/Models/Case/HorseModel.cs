namespace EquineCastration.Models.Case;

public class HorseModel
{
  public string Name { get; set; } = string.Empty;
  public string DateOfCastration { get; set; } = string.Empty;
  public int Age { get; set; }
  public int Weight { get; set; }
  public string Breed { get; set; } = string.Empty;
  public string? BreedOther { get; set; } = string.Empty;
  public bool IsClinicallyHealthy { get; set; }
  public string? IsClinicallyHealthyNo { get; set; } = string.Empty;
  public bool IsOnMedication { get; set; }
  public string? IsOnMedicationYes { get; set; } = string.Empty;
  public string LocationTesticleLeft { get; set; } = string.Empty;
  public string LocationTesticleRight { get; set; } = string.Empty;
  public bool Deceased { get; set; }
  
  public HorseModel(Data.Entities.Horse entity)
  {
    Name = entity.Name;
    DateOfCastration = entity.DateOfCastration.ToString("dd/MM/yyyy");
    Age = entity.Age;
    Weight = entity.Weight;
    Breed = entity.Breed;
    BreedOther = entity.BreedOther;
    IsClinicallyHealthy = entity.IsClinicallyHealthy;
    IsClinicallyHealthyNo = entity.IsClinicallyHealthyNo;
    IsOnMedication = entity.IsOnMedication;
    IsOnMedicationYes = entity.IsOnMedicationYes;
    LocationTesticleLeft = entity.LocationTesticleLeft;
    LocationTesticleRight = entity.LocationTesticleRight;
    Deceased = entity.Deceased;
  }
}
