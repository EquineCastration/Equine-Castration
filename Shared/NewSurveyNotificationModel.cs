namespace Shared;
public record NewSurveyNotificationModel()
{
  public string HorseName { get; set; } = string.Empty;
  public DateTimeOffset DischargeDate { get; set; }
  public string OwnerEmail { get; set; } = string.Empty;
  /// <summary>
  /// Number of days since the discharge date
  /// </summary>
  public int Days { get; set; }
}
