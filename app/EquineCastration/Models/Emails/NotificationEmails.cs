namespace EquineCastration.Models.Emails;

public record DischargeEmailModel(
  string RecipientName,
  string HorseName,
  string DischargeDate,
  string VeterinarianName,
  string AppStoreLink,
  string PlayStoreLink
);

public record NewSurveyNotificationEmailModel(
  string HorseName,
  string DischargeDate,
  string OwnerEmail,
  int Days,
  string AppStoreLink,
  string PlayStoreLink
);
