using EquineCastration.Data.Entities;

namespace EquineCastration.Models.Survey;

public class CreateSurveyModel : BaseSurveyModel
{
  public int CaseId { get; set; }
  public int SurveyTypeId { get; set; }
  
  public Data.Entities.Survey ToEntity(SurveyType surveyType, Data.Entities.Case surveyCase)
    => new()
    {
      SurveyType = surveyType,
      Case = surveyCase, 
      HasReturnedToNormalBehaviour = HasReturnedToNormalBehaviour,
      IsStiffOrLame = IsStiffOrLame,
      HasWoundDischarge = HasWoundDischarge,
      HasWoundDischargeOther = HasWoundDischargeOther,
      IsProtrudingFromSurgicalSite = IsProtrudingFromSurgicalSite,
      HasSwellingAtSurgicalSite = HasSwellingAtSurgicalSite,
      HasSwellingAtSurgicalSiteOther = HasSwellingAtSurgicalSiteOther,
      PictogramPainScore = PictogramPainScore,
      RequiredVetOrComplications = RequiredVetOrComplications,
      FurtherInformation = FurtherInformation,
      HasSurgicalSiteHealed = HasSurgicalSiteHealed,
      HasSurgicalSiteHealedOther = HasSurgicalSiteHealedOther,
      FirstTwoWeeksComplications = FirstTwoWeeksComplications,
      FirstTwoWeeksComplicationsYesOther = FirstTwoWeeksComplicationsYesOther,
      AfterTwoWeeksComplications = AfterTwoWeeksComplications,
      AfterTwoWeeksComplicationsYesOther = AfterTwoWeeksComplicationsYesOther
    };
}
