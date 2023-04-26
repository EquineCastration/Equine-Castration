namespace EquineCastration.Models.Case;

public record CaseModel
{
  public int Id { get; set; }
  public string HorseName { get; set; } = string.Empty;
  public string ClientSurname { get; set; } = string.Empty;
  public string DateOfCastration { get; set; } = string.Empty;
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
  public string PatientCleanliness { get; set; } = string.Empty;
  public string PatientCleanlinessOther { get; set; } = string.Empty;
  public string EnvironmentCleanliness { get; set; } = string.Empty;
  public string EnvironmentCleanlinessOther { get; set; } = string.Empty;
  public string PatienceCompliance { get; set; } = string.Empty;
  public string PatienceComplianceOther { get; set; } = string.Empty;
  
  public CaseModel(Data.Entities.Case entity)
  {
    Id = entity.Id;
    HorseName = entity.HorseName;
    ClientSurname = entity.ClientSurname;
    DateOfCastration = entity.DateOfCastration.ToString("dd/MM/yyyy");
    IsLessThanTwo = entity.IsLessThanTwo;
    AgeAboveTwo = entity.AgeAboveTwo;
    Weight = entity.Weight;
    Breed = entity.Breed;
    Technique = entity.Technique;
    TechniqueOther = entity.TechniqueOther;
    LocationTesticleLeft = entity.LocationTesticleLeft;
    LocationTesticleRight = entity.LocationTesticleRight;
    LigatureUsed = entity.LigatureUsed;
    SkinClosure = entity.SkinClosure;
    SkinClosureOther = entity.SkinClosureOther;
    Restraint = entity.Restraint;
    RestraintStanding = entity.RestraintStanding;
    Environment = entity.Environment;
    EnvironmentOther = entity.EnvironmentOther;
    Location = entity.Location;
    PatientCleanliness = entity.PatientCleanliness;
    PatientCleanlinessOther = entity.PatientCleanlinessOther;
    EnvironmentCleanliness = entity.EnvironmentCleanliness;
    EnvironmentCleanlinessOther = entity.EnvironmentCleanlinessOther;
    PatienceCompliance = entity.PatienceCompliance;
    PatienceComplianceOther = entity.PatienceComplianceOther;
  }
}

