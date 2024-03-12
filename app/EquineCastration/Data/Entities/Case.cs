using EquineCastration.Data.Entities.Identity;

namespace EquineCastration.Data.Entities;

public class Case
{
  public int Id { get; set; }
  public Horse Horse { get; set; } = null!;
  public Owner Owner { get; set; } = null!;
  
  #region Surgical Technique
  /// <summary>
  /// Local anaesthetic used.
  /// </summary>
  public bool LocalAnaestheticUsed { get; set; }
  
  /// <summary>
  /// The parietal tunic was incised during surgery, prior to emasculation.
  /// </summary>
  public bool ParietalTunicIncised { get; set; }
  
  /// <summary>
  /// A portion of the parietal tunic was removed during surgery.
  /// </summary>
  public bool PortionParietalTunicRemoved { get; set; }
  
  /// <summary>
  /// Emasculators used.
  /// </summary>
  public bool EmasculatorsUsed { get; set; }
  /// <summary>
  /// If yes, how long were the emasculators held in place (minutes)?
  /// </summary>
  public int? EmasculatorsHeldDurationMinutes { get; set; }
  
  /// <summary>
  /// Were ligatures used to close the parietal tunic?
  /// </summary>
  public bool LigaturesUsedToCloseParietalTunic { get; set; }
  /// <summary>
  /// If yes, how many ligatures?
  /// </summary>
  public string? LigaturesUsedToCloseParietalTunicYes { get; set; }
  /// <summary>
  /// If yes and other, please specify
  /// </summary>
  public string? LigaturesUsedToCloseParietalTunicYesOther { get; set; }
  
  /// <summary>
  /// Were ligatures placed around the vasculature only and the parietal tunic remained open.
  /// </summary>
  public bool LigaturesPlacedAroundVasculatureOnly { get; set; }
  /// <summary>
  /// If yes, how many ligatures?
  /// </summary>
  public string? LigaturesPlacedAroundVasculatureOnlyYes { get; set; }
  /// <summary>
  /// If yes and other, please specify
  /// </summary>
  public string? LigaturesPlacedAroundVasculatureOnlyYesOther { get; set; }
  
  public string SkinClosure { get; set; } = string.Empty;
  /// <summary>
  /// If primary or partial, Sutures or staples?
  /// </summary>
  public string? SkinClosurePrimaryOrPartial { get; set; }
  #endregion
  
  #region Preoperative Management
  public bool PreoperativeAnalgesiaGiven { get; set; }
  public List<string>? PreoperativeAnalgesiaGivenYes { get; set; }
  public string? PreoperativeAnalgesiaGivenYesOther { get; set; }
  
  public bool PreoperativeAntimicrobialsGiven { get; set; }
  public List<string>? PreoperativeAntimicrobialsGivenYes { get; set; }
  public string? PreoperativeAntimicrobialsGivenYesOther { get; set; }
  
  public int AantimicrobialAdminTiming { get; set; } // minutes
  #endregion
  
  #region Postoperative Management
  
  /// <summary>
  /// Postoperative analgesia given?
  /// </summary>
  public bool PostoperativeAnalgesiaGiven { get; set; }
  /// <summary>
  /// If yes, which analgesia was given?
  /// </summary>
  public List<string>? PostoperativeAnalgesiaGivenYes { get; set; }
  /// <summary>
  /// If yes and other, please specify
  /// </summary>
  public string? PostoperativeAnalgesiaGivenYesOther { get; set; }
  /// <summary>
  /// If yes, how many days postoperatively?
  /// </summary>
  public int? PostoperativeAnalgesiaGivenDays { get; set; }
  
  /// <summary>
  /// Postoperative antimicrobials given?
  /// </summary>
  public bool PostoperativeAntimicrobialsGiven { get; set; }
  /// <summary>
  /// If yes, which antimicrobials were given?
  /// </summary>
  public List<string>? PostoperativeAntimicrobialsGivenYes { get; set; }
  /// <summary>
  /// If yes and other, please specify
  /// </summary>
  public string? PostoperativeAntimicrobialsGivenYesOther { get; set; }
  /// <summary>
  /// If yes, how many days postoperatively?
  /// </summary>
  public int? PostoperativeAntimicrobialsGivenDays { get; set; }
  #endregion

  #region Environmental Factors
  public string Restraint { get; set; } = string.Empty;
  public string Location { get; set; } = string.Empty;
  public string? LocationOther { get; set; }
  public string EnvironmentCleanliness { get; set; } = string.Empty;
  public string? EnvironmentCleanlinessOther { get; set; }
  public string PatientCleanliness { get; set; } = string.Empty;
  public string? PatientCleanlinessOther { get; set; }
  #endregion

  #region Complications

  /// <summary>
  /// Were there any intraoperative complications?
  /// </summary>
  public bool AnyIntraoperativeComplications { get; set; }
  /// <summary>
  /// If yes, please describe any complications
  /// </summary>
  public string? AnyIntraoperativeComplicationsYes { get; set; }
  
  /// <summary>
  /// Were there any postoperative complications?
  /// </summary>
  public bool AnyPostoperativeComplications { get; set; }
  /// <summary>
  /// If yes, select complications
  /// </summary>
  public List<string>? AnyPostoperativeComplicationsYes { get; set; }
  /// <summary>
  /// If yes and other, please specify
  /// </summary>
  public string? AnyPostoperativeComplicationsYesOther { get; set; }
  
  #endregion
  
  public DateTimeOffset DischargeDate { get; set; }
  public bool InviteOwner { get; set; }
  public Veterinarian Author { get; set; } = null!;
}
