using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.Account.Token;

public record UserTokenModel(
    [Required]
    string UserId,
    [Required]
    string Token);

