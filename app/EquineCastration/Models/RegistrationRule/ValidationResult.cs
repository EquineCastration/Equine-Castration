namespace EquineCastration.Models.RegistrationRule;

public record ValidationResult
{
  public bool IsValid { get; set; } = false;
}
