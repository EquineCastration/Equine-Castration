namespace EquineCastration.Models.RegistrationRule;

public record RegistrationRuleModel {
  public int Id { get; set; }
  public string Value { get; set; } = string.Empty;
  public bool IsBlocked { get; set; }
  public DateTimeOffset Modified { get; set; }
}
