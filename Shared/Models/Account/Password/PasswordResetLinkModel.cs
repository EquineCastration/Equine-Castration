namespace EquineCastration.Models.Account.Password;

public record PasswordResetLinkModel
{
  public string PasswordResetLink { get; set; } = string.Empty;
};
