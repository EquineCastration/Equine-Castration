namespace EquineCastration.Models.Case;

public class BaseCaseModel
{
  public string ClientEmail { get; set; } = string.Empty;
  public bool LocalAnaestheticUsed { get; set; }
  public bool ParietalTunicIncised { get; set; }
  public bool PortionParietalTunicRemoved { get; set; }
  public bool EmasculatorsUsed { get; set; }
  public int? EmasculatorsHeldDurationMinutes { get; set; }
  public bool LigaturesUsedToCloseParietalTunic { get; set; }
  public string? LigaturesUsedToCloseParietalTunicYes { get; set; }
  public string? LigaturesUsedToCloseParietalTunicYesOther { get; set; }
  public bool LigaturesPlacedAroundVasculatureOnly { get; set; }
  public string? LigaturesPlacedAroundVasculatureOnlyYes { get; set; }
  public string? LigaturesPlacedAroundVasculatureOnlyYesOther { get; set; }
  public string SkinClosure { get; set; } = string.Empty;
  public string? SkinClosurePrimaryOrPartial { get; set; }
  
  public bool PreoperativeAnalgesiaGiven { get; set; }
  public List<string>? PreoperativeAnalgesiaGivenYes { get; set; }
  public string? PreoperativeAnalgesiaGivenYesOther { get; set; }
  public bool PreoperativeAntimicrobialsGiven { get; set; }
  public List<string>? PreoperativeAntimicrobialsGivenYes { get; set; }
  public string? PreoperativeAntimicrobialsGivenYesOther { get; set; }
  public int AantimicrobialAdminTiming { get; set; }
  
  public bool PostoperativeAnalgesiaGiven { get; set; }
  public List<string>? PostoperativeAnalgesiaGivenYes { get; set; }
  public string? PostoperativeAnalgesiaGivenYesOther { get; set; }
  public int? PostoperativeAnalgesiaGivenDays { get; set; }
  public bool PostoperativeAntimicrobialsGiven { get; set; }
  public List<string>? PostoperativeAntimicrobialsGivenYes { get; set; }
  public string? PostoperativeAntimicrobialsGivenYesOther { get; set; }
  public int? PostoperativeAntimicrobialsGivenDays { get; set; }
  
  public string Restraint { get; set; } = string.Empty;
  public string Location { get; set; } = string.Empty;
  public string? LocationOther { get; set; }
  public string EnvironmentCleanliness { get; set; } = string.Empty;
  public string? EnvironmentCleanlinessOther { get; set; }
  public string PatientCleanliness { get; set; } = string.Empty;
  public string? PatientCleanlinessOther { get; set; }
  
  public bool AnyIntraoperativeComplications { get; set; }
  public string? AnyIntraoperativeComplicationsYes { get; set; }
  public bool AnyPostoperativeComplications { get; set; }
  public List<string>? AnyPostoperativeComplicationsYes { get; set; }
  public string? AnyPostoperativeComplicationsYesOther { get; set; }
  public string DischargeDate { get; set; } = string.Empty;
}
public class CaseModel : BaseCaseModel
{
  public int Id { get; set; }
  public HorseModel Horse { get; set; }
  public CaseModel(Data.Entities.Case entity)
  {
    Id = entity.Id;
    ClientEmail = entity.Owner.Email;
    Horse = new HorseModel(entity.Horse);
    
    LocalAnaestheticUsed = entity.LocalAnaestheticUsed;
    ParietalTunicIncised = entity.ParietalTunicIncised;
    PortionParietalTunicRemoved = entity.PortionParietalTunicRemoved;
    EmasculatorsUsed = entity.EmasculatorsUsed;
    EmasculatorsHeldDurationMinutes = entity.EmasculatorsHeldDurationMinutes;
    LigaturesUsedToCloseParietalTunic = entity.LigaturesUsedToCloseParietalTunic;
    LigaturesUsedToCloseParietalTunicYes = entity.LigaturesUsedToCloseParietalTunicYes;
    LigaturesUsedToCloseParietalTunicYesOther = entity.LigaturesUsedToCloseParietalTunicYesOther;
    LigaturesPlacedAroundVasculatureOnly = entity.LigaturesPlacedAroundVasculatureOnly;
    LigaturesPlacedAroundVasculatureOnlyYes = entity.LigaturesPlacedAroundVasculatureOnlyYes;
    LigaturesPlacedAroundVasculatureOnlyYesOther = entity.LigaturesPlacedAroundVasculatureOnlyYesOther;
    SkinClosure = entity.SkinClosure;
    SkinClosurePrimaryOrPartial = entity.SkinClosurePrimaryOrPartial;
    
    PreoperativeAnalgesiaGiven = entity.PreoperativeAnalgesiaGiven;
    PreoperativeAnalgesiaGivenYes = entity.PreoperativeAnalgesiaGivenYes;
    PreoperativeAnalgesiaGivenYesOther = entity.PreoperativeAnalgesiaGivenYesOther;
    PreoperativeAntimicrobialsGiven = entity.PreoperativeAntimicrobialsGiven;
    PreoperativeAntimicrobialsGivenYes = entity.PreoperativeAntimicrobialsGivenYes;
    PreoperativeAntimicrobialsGivenYesOther = entity.PreoperativeAntimicrobialsGivenYesOther;
    AantimicrobialAdminTiming = entity.AantimicrobialAdminTiming;
    
    PostoperativeAnalgesiaGiven = entity.PostoperativeAnalgesiaGiven;
    PostoperativeAnalgesiaGivenYes = entity.PostoperativeAnalgesiaGivenYes;
    PostoperativeAnalgesiaGivenYesOther = entity.PostoperativeAnalgesiaGivenYesOther;
    PostoperativeAnalgesiaGivenDays = entity.PostoperativeAnalgesiaGivenDays;
    PostoperativeAntimicrobialsGiven = entity.PostoperativeAntimicrobialsGiven;
    PostoperativeAntimicrobialsGivenYes = entity.PostoperativeAntimicrobialsGivenYes;
    PostoperativeAntimicrobialsGivenYesOther = entity.PostoperativeAntimicrobialsGivenYesOther;
    PostoperativeAntimicrobialsGivenDays = entity.PostoperativeAntimicrobialsGivenDays;
    
    Restraint = entity.Restraint;
    Location = entity.Location;
    LocationOther = entity.LocationOther;
    PatientCleanliness = entity.PatientCleanliness;
    PatientCleanlinessOther = entity.PatientCleanlinessOther;
    EnvironmentCleanliness = entity.EnvironmentCleanliness;
    EnvironmentCleanlinessOther = entity.EnvironmentCleanlinessOther;
    
    AnyIntraoperativeComplications = entity.AnyIntraoperativeComplications;
    AnyIntraoperativeComplicationsYes = entity.AnyIntraoperativeComplicationsYes;
    AnyPostoperativeComplications = entity.AnyPostoperativeComplications;
    AnyPostoperativeComplicationsYes = entity.AnyPostoperativeComplicationsYes;
    AnyPostoperativeComplicationsYesOther = entity.AnyPostoperativeComplicationsYesOther;
    
    DischargeDate = entity.DischargeDate.ToString("dd/MM/yyyy");
  }
}

