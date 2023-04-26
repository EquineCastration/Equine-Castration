using System.Globalization;
using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Models.Case;

public record CreateCaseModel
  {
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
  

  public Data.Entities.Case ToEntity(ApplicationUser author)
    => new()
    {
      HorseName = HorseName,
      ClientSurname = ClientSurname,
      DateOfCastration = DateTime.ParseExact(DateOfCastration, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToUniversalTime(),
      IsLessThanTwo = IsLessThanTwo,
      AgeAboveTwo = AgeAboveTwo,
      Weight = Weight,
      Breed = Breed,
      Technique = Technique,
      TechniqueOther = TechniqueOther,
      LocationTesticleLeft = LocationTesticleLeft,
      LocationTesticleRight = LocationTesticleRight,
      LigatureUsed = LigatureUsed,
      SkinClosure = SkinClosure,
      SkinClosureOther = SkinClosureOther,
      Restraint = Restraint,
      RestraintStanding = RestraintStanding,
      Environment = Environment,
      EnvironmentOther = EnvironmentOther,
      Location = Location,
      PatientCleanliness = PatientCleanliness,
      PatientCleanlinessOther = PatientCleanlinessOther,
      EnvironmentCleanliness = EnvironmentCleanliness,
      EnvironmentCleanlinessOther = EnvironmentCleanlinessOther,
      PatienceCompliance = PatienceCompliance,
      PatienceComplianceOther = PatienceComplianceOther,
      Author = author
      
    };
  }
