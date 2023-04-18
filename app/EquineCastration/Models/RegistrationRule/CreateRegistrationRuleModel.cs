using System.ComponentModel.DataAnnotations;

namespace EquineCastration.Models.RegistrationRule;

public record CreateRegistrationRuleModel(
  [Required] string Value,

  [Required] bool IsBlocked
);
