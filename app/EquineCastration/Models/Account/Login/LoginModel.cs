using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.Account.Login;

public record LoginModel(
  [Required]
  [EmailAddress]
  string Username,

  [Required]
  [DataType(DataType.Password)]
  string Password
);
