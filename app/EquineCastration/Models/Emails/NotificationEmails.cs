namespace EquineCastration.Models.Emails;

public record DischargeEmailModel(
  string RecipientName,
  string HorseName,
  string DischargeDate,
  string VeterinarianName,
  string AppStoreLink,
  string PlayStoreLink
);
