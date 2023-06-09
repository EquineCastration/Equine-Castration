using EquineCastration.Models.User;

namespace EquineCastration.Models.Account.Login;

public record LoginResult
{
  public UserProfileModel? User { get; set; }
  public bool? IsUnconfirmedAccount { get; init; } = null;
  public List<string> Errors { get; init; } = new();
}
