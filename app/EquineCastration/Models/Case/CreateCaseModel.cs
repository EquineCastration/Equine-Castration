using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.Case;

public record CreateCaseModel(
  [Required] string HorseName,
  [Required] string ClientSurname,
  DateOnly DateOfCastration,
  bool IsLessThanTwo,
  int AgeAboveTwo,
  [Required] int Weight,
  [Required] string Breed,
  [Required] string Technique,
  string TechniqueOther,
  [Required] string LocationTesticleLeft,
  [Required] string LocationTesticleRight,
  [Required] string LigatureUsed,
  [Required] string SkinClosure,
  string SkinClosureOther,
  [Required] string Restraint,
  string RestraintStanding,
  [Required] string Environment,
  string EnvironmentOther,
  [Required] string Location,
  [Required] string PatientCleanliness,
  string PatientCleanlinessOther,
  [Required] string EnvironmentCleanliness,
  string EnvironmentCleanlinessOther,
  [Required] string PatienceCompliance,
  string PatienceComplianceOther
);

