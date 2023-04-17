export const getRegistrationRulesApi = ({ api }) => ({
  /**
   * Validate email
   * @param {*} email email to validate
   * @returns
   */
  validate: (email) =>
    api.post("registrationRules/validate", {
      json: email,
    }),
});
