using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.Account.Token;

public record EmailChangeTokenModel(
  [Required]
  string UserId,
  [Required]
  string Token,
  [Required]
  string NewEmail);
