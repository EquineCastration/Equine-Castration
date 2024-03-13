namespace EquineCastration.Models.User;

public record BaseUserProfileModel(
  string Email,
  string FullName,
  string UICulture,
  List<string> Permissions
);

public record UserProfileModel(
  string Email,
  string FullName,
  string UICulture,
  List<string> Permissions,
  List<string> Roles

)
  : BaseUserProfileModel(
      Email,
      FullName,
      UICulture,
     Permissions);

