export const getAccountApi = ({ api }) => ({
  /**
   * Try to confirm a User account
   * @param {*} userId The User ID
   * @param {*} token The previous Account Confirmation token
   * @returns
   */
  confirm: (userId, token) =>
    api.post("account/confirm", {
      json: { userId, token },
    }),

  /**
   * Resend an account confirmation email
   * @param {*} userIdOrEmail The User ID or Email Address
   * @returns
   */
  resendConfirm: (userIdOrEmail) =>
    api.post("account/confirm/resend", {
      json: userIdOrEmail,
    }),

  /**
   * Try to confirm a email change
   * @param {*} userId The User ID
   * @param {*} token The email change token
   * @param {*} newEmail The new email
   * @returns
   */
  confirmEmailChange: (userId, token, newEmail) =>
    api.post("account/confirmEmailChange", {
      json: {
        credentials: { userId, token },
        data: { newEmail },
      },
    }),

  /**
   * Request a password reset email
   * @param {*} userIdOrEmail The User ID or Email Address
   * @returns
   */
  requestPasswordReset: (userIdOrEmail) =>
    api.post("account/password/reset", {
      json: userIdOrEmail,
    }),

  /**
   * Reset a User's password, using a valid token
   * @param {*} userId User ID to reset password for
   * @param {*} token System issued password reset token
   * @param {*} password the new password
   * @param {*} passwordConfirm confirm the new password
   * @returns
   */
  resetPassword: (userId, token, password, passwordConfirm) =>
    api.post("account/password", {
      json: {
        credentials: { userId, token },
        data: { password, passwordConfirm },
      },
    }),

  /**
   * Request a account deletion
   * @param {*} userIdOrEmail The User ID or Email Address
   * @returns
   */
  requestAccountDelete: (userIdOrEmail) =>
    api.post("account/delete", {
      json: userIdOrEmail,
    }),
});
