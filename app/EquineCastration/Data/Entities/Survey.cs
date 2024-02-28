namespace EquineCastration.Data.Entities;

public class Survey
{
  public int Id { get; set; }
  public SurveyType SurveyType { get; set; }
  public Case Case { get; set; } = null!;
  public DateTimeOffset SurveyCompletion { get; set; } = DateTimeOffset.Now;

  public bool HasReturnedToNormalBehaviour { get; set; }
  public string IsStiffOrLame { get; set; } = string.Empty;
  public string HasWoundDischarge { get; set; } = string.Empty;
  public string HasWoundDischargeOther { get; set; } = string.Empty;
  public bool IsProtrudingFromSurgicalSite { get; set; }
  public string HasSwellingAtSurgicalSite { get; set; } = string.Empty;
  public string HasSwellingAtSurgicalSiteOther { get; set; } = string.Empty;
  public int PictogramPainScore { get; set; }
  public string RequiredVetOrComplications { get; set; } = string.Empty;
  public string FurtherInformation { get; set; } = string.Empty;

  public string HasSurgicalSiteHealed { get; set; } = string.Empty;
  public string HasSurgicalSiteHealedOther { get; set; } = string.Empty;
  public string FirstTwoWeeksComplications { get; set; } = string.Empty;
  public string FirstTwoWeeksComplicationsYesOther { get; set; } = string.Empty;

  public string AfterTwoWeeksComplications { get; set; } = string.Empty;
  public string AfterTwoWeeksComplicationsYesOther { get; set; } = string.Empty;
}
