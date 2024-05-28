namespace EquineCastration.Models.Survey;

public class BaseSurveyModel
{
  public bool? HasReturnedToNormalBehaviour { get; set; }
  public string? IsStiffOrLame { get; set; }
  public string? HasWoundDischarge { get; set; }
  public string? HasWoundDischargeOther { get; set; }
  public bool? IsProtrudingFromSurgicalSite { get; set; }
  public string? HasSwellingAtSurgicalSite { get; set; }
  public string? HasSwellingAtSurgicalSiteOther { get; set; }
  public int? PictogramPainScore { get; set; }
  public string RequiredVetOrComplications { get; set; } = string.Empty;
  public string FurtherInformation { get; set; } = string.Empty;

  public string? HasSurgicalSiteHealed { get; set; }
  public string? HasSurgicalSiteHealedOther { get; set; }
  public string? FirstTwoWeeksComplications { get; set; }
  public string? FirstTwoWeeksComplicationsYesOther { get; set; }

  public string? AfterTwoWeeksComplications { get; set; }
  public string? AfterTwoWeeksComplicationsYesOther { get; set; }
}

public class SurveyModel : BaseSurveyModel
{
  public int Id { get; set; }
  public int CaseId { get; set; }
  public int HorseId { get; set; }
  public SurveyTypeModel SurveyType { get; set; }
  public DateTimeOffset SurveyCompletion { get; set; }

  public SurveyModel(Data.Entities.Survey entity)
  {
    Id = entity.Id;
    CaseId = entity.Case.Id;
    HorseId = entity.Case.Horse.Id;
    SurveyType = new SurveyTypeModel(entity.SurveyType.Id, entity.SurveyType.Name, entity.SurveyType.DaysAfterCase);
    SurveyCompletion = entity.SurveyCompletion;
    HasReturnedToNormalBehaviour = entity.HasReturnedToNormalBehaviour;
    IsStiffOrLame = entity.IsStiffOrLame;
    HasWoundDischarge = entity.HasWoundDischarge;
    HasWoundDischargeOther = entity.HasWoundDischargeOther;
    IsProtrudingFromSurgicalSite = entity.IsProtrudingFromSurgicalSite;
    HasSwellingAtSurgicalSite = entity.HasSwellingAtSurgicalSite;
    HasSwellingAtSurgicalSiteOther = entity.HasSwellingAtSurgicalSiteOther;
    PictogramPainScore = entity.PictogramPainScore;
    RequiredVetOrComplications = entity.RequiredVetOrComplications;
    FurtherInformation = entity.FurtherInformation;
    HasSurgicalSiteHealed = entity.HasSurgicalSiteHealed;
    HasSurgicalSiteHealedOther = entity.HasSurgicalSiteHealedOther;
    FirstTwoWeeksComplications = entity.FirstTwoWeeksComplications;
    FirstTwoWeeksComplicationsYesOther = entity.FirstTwoWeeksComplicationsYesOther;
    AfterTwoWeeksComplications = entity.AfterTwoWeeksComplications;
    AfterTwoWeeksComplicationsYesOther = entity.AfterTwoWeeksComplicationsYesOther;
  }
}
