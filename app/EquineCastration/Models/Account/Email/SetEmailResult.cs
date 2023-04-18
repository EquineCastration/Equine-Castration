using EquineCastration.Models.User;

namespace EquineCastration.Models.Account.Email;
public record SetEmailResult
{
  public UserProfileModel? User { get; init; } = null;
  public bool? IsUnconfirmedAccount { get; init; } = null;
  public bool? IsExistingEmail { get; init; } = null;
  public bool? IsNotAllowlisted { get; init; } = null;
  public List<string>? Errors { get; init; } = new();
}
