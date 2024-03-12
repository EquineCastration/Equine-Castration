using System.Globalization;
using EquineCastration.Data.Entities;
using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Models.Case;

public class CreateCaseModel : BaseCaseModel
{
  public bool OwnerParticipationConsent { get; set; }
  public HorseModel Horse { get; set; } = null!;

  public Data.Entities.Case ToEntity(Veterinarian author, Horse horse, Owner owner)
    => new()
    {
      Horse = horse,
      Owner = owner,
      Author = author,
      LocalAnaestheticUsed = LocalAnaestheticUsed,
      ParietalTunicIncised = ParietalTunicIncised,
      PortionParietalTunicRemoved = PortionParietalTunicRemoved,
      EmasculatorsUsed = EmasculatorsUsed,
      EmasculatorsHeldDurationMinutes = EmasculatorsHeldDurationMinutes,
      LigaturesUsedToCloseParietalTunic = LigaturesUsedToCloseParietalTunic,
      LigaturesUsedToCloseParietalTunicYes = LigaturesUsedToCloseParietalTunicYes,
      LigaturesUsedToCloseParietalTunicYesOther = LigaturesUsedToCloseParietalTunicYesOther,
      LigaturesPlacedAroundVasculatureOnly = LigaturesPlacedAroundVasculatureOnly,
      LigaturesPlacedAroundVasculatureOnlyYes = LigaturesPlacedAroundVasculatureOnlyYes,
      LigaturesPlacedAroundVasculatureOnlyYesOther = LigaturesPlacedAroundVasculatureOnlyYesOther,
      SkinClosure = SkinClosure,
      SkinClosurePrimaryOrPartial = SkinClosurePrimaryOrPartial,
      PreoperativeAnalgesiaGiven = PreoperativeAnalgesiaGiven,
      PreoperativeAnalgesiaGivenYes = PreoperativeAnalgesiaGivenYes,
      PreoperativeAnalgesiaGivenYesOther = PreoperativeAnalgesiaGivenYesOther,
      PreoperativeAntimicrobialsGiven = PreoperativeAntimicrobialsGiven,
      PreoperativeAntimicrobialsGivenYes = PreoperativeAntimicrobialsGivenYes,
      PreoperativeAntimicrobialsGivenYesOther = PreoperativeAntimicrobialsGivenYesOther,
      AantimicrobialAdminTiming = AantimicrobialAdminTiming,
      PostoperativeAnalgesiaGiven = PostoperativeAnalgesiaGiven,
      PostoperativeAnalgesiaGivenYes = PostoperativeAnalgesiaGivenYes,
      PostoperativeAnalgesiaGivenYesOther = PostoperativeAnalgesiaGivenYesOther,
      PostoperativeAnalgesiaGivenDays = PostoperativeAnalgesiaGivenDays,
      PostoperativeAntimicrobialsGiven = PostoperativeAntimicrobialsGiven,
      PostoperativeAntimicrobialsGivenYes = PostoperativeAntimicrobialsGivenYes,
      PostoperativeAntimicrobialsGivenYesOther = PostoperativeAntimicrobialsGivenYesOther,
      PostoperativeAntimicrobialsGivenDays = PostoperativeAntimicrobialsGivenDays,
      Restraint = Restraint,
      Location = Location,
      LocationOther = LocationOther,
      EnvironmentCleanliness = EnvironmentCleanliness,
      EnvironmentCleanlinessOther = EnvironmentCleanlinessOther,
      PatientCleanliness = PatientCleanliness,
      PatientCleanlinessOther = PatientCleanlinessOther,
      AnyIntraoperativeComplications = AnyIntraoperativeComplications,
      AnyIntraoperativeComplicationsYes = AnyIntraoperativeComplicationsYes,
      AnyPostoperativeComplications = AnyPostoperativeComplications,
      AnyPostoperativeComplicationsYes = AnyPostoperativeComplicationsYes,
      AnyPostoperativeComplicationsYesOther = AnyPostoperativeComplicationsYesOther,
      DischargeDate = DateTimeOffset.ParseExact(DischargeDate, "dd/MM/yyyy", CultureInfo.InvariantCulture),
      InviteOwner = OwnerParticipationConsent,
    };

  public Horse ToHorseEntity()
    => new()
    {
      Name = Horse.Name,
      DateOfCastration = DateTimeOffset.ParseExact(Horse.DateOfCastration, "dd/MM/yyyy", CultureInfo.InvariantCulture),
      Age = Horse.Age,
      Weight = Horse.Weight,
      Breed = Horse.Breed,
      BreedOther = Horse.BreedOther,
      IsClinicallyHealthy = Horse.IsClinicallyHealthy,
      IsClinicallyHealthyNo = Horse.IsClinicallyHealthyNo,
      IsOnMedication = Horse.IsOnMedication,
      IsOnMedicationYes = Horse.IsOnMedicationYes,
      LocationTesticleLeft = Horse.LocationTesticleLeft,
      LocationTesticleRight = Horse.LocationTesticleRight,
      Deceased = Horse.Deceased
    };
}
