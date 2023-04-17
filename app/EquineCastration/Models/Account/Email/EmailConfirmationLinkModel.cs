namespace EquineCastration.Models.Account.Email;

public record EmailConfirmationLinkModel
{
  public string EmailConfirmationLink { get; set; } = string.Empty;
};
