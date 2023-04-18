export const getRegistrationRulesApi = ({ api }) => ({
  /**
   * Validate email
   * @param {*} email email to validate
   * @returns
   */
  validate: (email) =>
    api.post("registrationRules/validate", email, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
});
