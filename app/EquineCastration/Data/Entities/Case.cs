using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Data.Entities;

public class Case
{
  public int Id { get; set; }
  public Horse Horse { get; set; } = null!;
  public Owner Owner { get; set; } = null!;
  public DateTimeOffset DateOfCastration { get; set; }
  public bool IsLessThanTwo { get; set; }
  public int AgeAboveTwo { get; set; }
  public int Weight { get; set; }
  public string Breed { get; set; } = string.Empty;
  public string Technique { get; set; } = string.Empty;
  public string TechniqueOther { get; set; } = string.Empty;
  public string LocationTesticleLeft { get; set; } = string.Empty;
  public string LocationTesticleRight { get; set; } = string.Empty;
  public string LigatureUsed { get; set; } = string.Empty;
  public string SkinClosure { get; set; } = string.Empty;
  public string SkinClosureOther { get; set; } = string.Empty;
  public string Restraint { get; set; } = string.Empty;
  public string RestraintStanding { get; set; } = string.Empty;
  public List<string> Environment { get; set; } = new();
  public string EnvironmentOther { get; set; } = string.Empty;
  public string Location { get; set; } = string.Empty;
  public string LocationOther { get; set; } = string.Empty;
  public string PatientCleanliness { get; set; } = string.Empty;
  public string PatientCleanlinessOther { get; set; } = string.Empty;
  public string EnvironmentCleanliness { get; set; } = string.Empty;
  public string EnvironmentCleanlinessOther { get; set; } = string.Empty;
  public string PatientCompliance { get; set; } = string.Empty;
  public string PatientComplianceOther { get; set; } = string.Empty;
  public DateTimeOffset DischargeDate { get; set; }
  public bool Deceased { get; set; }
  public bool InviteOwner { get; set; }
  public Veterinarian Author { get; set; } = null!;
}
