
namespace EquineCastration.Constants;

public static class ClientRoutes
{
  public const string ResetPassword = "/account/password";

  public const string ResendResetPassword = "/account/password/resend";

  public const string ConfirmAccount = "/account/confirm"; // path to account confirmation (when user self registers)

  public const string ResendConfirm = "/account/confirm/resend"; // path to re-send account confirmation  (when user self registers)

  public const string ConfirmEmailChange = "/account/ConfirmEmailChange"; // path to email change confirmation 
}
