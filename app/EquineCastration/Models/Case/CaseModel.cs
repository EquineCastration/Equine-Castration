using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.Case;

public record CaseModel
{
  public int Id { get; set; }
  public string HorseName { get; set; } = string.Empty;
  public string ClientSurname { get; set; } = string.Empty;
  public DateOnly DateOfCastration { get; set; }
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
  public string Environment { get; set; } = string.Empty;
  public string EnvironmentOther { get; set; } = string.Empty;
  public string Location { get; set; } = string.Empty;
  public string PatientCleanliness { get; set; } = string.Empty;
  public string PatientCleanlinessOther { get; set; } = string.Empty;
  public string EnvironmentCleanliness { get; set; } = string.Empty;
  public string EnvironmentCleanlinessOther { get; set; } = string.Empty;
  public string PatienceCompliance { get; set; } = string.Empty;
  public string PatienceComplianceOther { get; set; } = string.Empty;
}

