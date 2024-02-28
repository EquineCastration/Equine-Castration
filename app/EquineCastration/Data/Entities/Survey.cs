namespace EquineCastration.Data.Entities;

public class Survey
{
  public int Id { get; set; }
  public SurveyType SurveyType { get; set; } = null!;
  public Case Case { get; set; } = null!;
  public DateTimeOffset SurveyCompletion { get; set; } = DateTimeOffset.Now;
  
  #region Applies to 24hrs post-surgery AND days 3, 5 7 and 14)
  
  /// <summary>
  /// Has your horse returned to normal eating and drinking behaviours?
  /// </summary>
  public bool HasReturnedToNormalBehaviour { get; set; }
  
  /// <summary>
  /// Does your horse appear stiff or lame?
  /// </summary>
  public string? IsStiffOrLame { get; set; }
  
  /// <summary>
  /// Is there any swelling present at the surgical sites?
  /// </summary>
  public string? HasSwellingAtSurgicalSite { get; set; } = string.Empty;
  
  /// <summary>
  /// Is there any swelling present at the surgical sites? If other, please specify
  /// </summary>
  public string? HasSwellingAtSurgicalSiteOther { get; set; }
  
  /// <summary>
  /// Applies to 24hrs post-surgery AND days 3, 5, 7 and 14)
  /// Using the pictograms below, what is the total pain score for your horse?
  /// </summary>
  public int PictogramPainScore { get; set; }
  
  #endregion
  
  #region Applies to 24hrs post-surgery AND days 3, 5 and 7)
 
  /// <summary>
  /// Is there any discharge coming from the wound?
  /// </summary>
  public string? HasWoundDischarge { get; set; }
  
  /// <summary>
  /// Is there any discharge coming from the wound? If other, please specify
  /// </summary>
  public string? HasWoundDischargeOther { get; set; }
  
  /// <summary>
  /// Is there anything protruding from the surgical site?
  /// </summary>
  public bool IsProtrudingFromSurgicalSite { get; set; }
  
  #endregion
  
  #region Only applies to day 14
  
  /// <summary>
  /// Has the surgical site fully healed?
  /// </summary>
  public string? HasSurgicalSiteHealed { get; set; } = string.Empty;
  
  /// <summary>
  /// Has the surgical site fully healed? If other, please specify
  /// </summary>
  public string? HasSurgicalSiteHealedOther { get; set; } = string.Empty;
  
  /// <summary>
  /// Did your horse have any complications in the first two weeks postoperatively?
  /// </summary>
  public string? FirstTwoWeeksComplications { get; set; } = string.Empty;
  
  /// <summary>
  /// Did your horse have any complications in the first two weeks postoperatively?
  /// If yes, please specify
  /// </summary>
  public string? FirstTwoWeeksComplicationsYesOther { get; set; } = string.Empty;

  #endregion
  
  #region Only applies to month three
  
  /// <summary>
  /// Has your horse returned to his normal self?
  /// </summary>
  public bool HasReturnedToNormalSelf { get; set; }
  
  /// <summary>
  /// Did your horse have any complications from two weeks postoperatively to now?
  /// </summary>
  public string? AfterTwoWeeksComplications { get; set; }
  
  /// <summary>
  /// Did your horse have any complications from two weeks postoperatively to now?
  /// If yes, please specify
  /// </summary>
  public string? AfterTwoWeeksComplicationsYesOther { get; set; }
  
  /// <summary>
  /// Is there any swelling present at the surgical sites?
  /// </summary>
  public bool HasSwellingPresentAtSurgicalSite { get; set; }
  
  /// <summary>
  /// Is there any discharge coming from the surgical sites?
  /// </summary>
  public bool HasAnyDischarge { get; set; }
  
  #endregion
  
  #region Applies to all
  
  /// <summary>
  /// If your horse required veterinary attention for any complications,
  /// please provide the practice name.
  /// </summary>
  public string RequiredVetOrComplications { get; set; } = string.Empty;
  
  /// <summary>
  /// If you would like to add any further information, there is space below
  /// </summary>
  public string FurtherInformation { get; set; } = string.Empty;
  
  #endregion
}
