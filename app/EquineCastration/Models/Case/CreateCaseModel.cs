using System.Globalization;
using EquineCastration.Data.Entities;
using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Models.Case;

public record CreateCaseModel
  {
  public string HorseName { get; set; } = string.Empty;
  public string ClientEmail { get; set; } = string.Empty;
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
  public string LocationOther { get; set; } = string.Empty;
  public string PatientCleanliness { get; set; } = string.Empty;
  public string PatientCleanlinessOther { get; set; } = string.Empty;
  public string EnvironmentCleanliness { get; set; } = string.Empty;
  public string EnvironmentCleanlinessOther { get; set; } = string.Empty;
  public string PatientCompliance { get; set; } = string.Empty;
  public string PatientComplianceOther { get; set; } = string.Empty;
  public string DischargeDate { get; set; } = string.Empty;
  public bool Deceased { get; set; }
  public bool InviteOwner { get; set; }
  

  public Data.Entities.Case ToEntity(Veterinarian author, Horse horse, Owner owner)
    => new()
    {
      Horse = horse,
      Owner = owner,
      DateOfCastration = new DateTimeOffset(DateTime.ParseExact(DateOfCastration, "dd/MM/yyyy", CultureInfo.InvariantCulture), TimeSpan.Zero),
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
      LocationOther = LocationOther,
      PatientCleanliness = PatientCleanliness,
      PatientCleanlinessOther = PatientCleanlinessOther,
      EnvironmentCleanliness = EnvironmentCleanliness,
      EnvironmentCleanlinessOther = EnvironmentCleanlinessOther,
      PatientCompliance = PatientCompliance,
      PatientComplianceOther = PatientComplianceOther,
      DischargeDate = new DateTimeOffset(DateTimeOffset.Now.Date, TimeSpan.Zero), // TODO: assign actual discharge date
      Deceased = Deceased,
      InviteOwner = InviteOwner,
      Author = author
    };
  }
