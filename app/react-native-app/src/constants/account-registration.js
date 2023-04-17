export const accountRegistration = {
  // The followings are relevant elements for Account Registration Form
  // These are being used in the form
  // as field name, field label, field options and in formik initial values
  title: "Account Registration",
  fields: {
    id: {
      label: "Account Id",
    },
    name: {
      label: "Full name",
      defaultValue: "",
    },
    password: {
      label: "Password",
      defaultValue: "",
    },
    email: {
      label: "Email",
      defaultValue: "",
    },
    institution: {
      label: "Institution",
      defaultValue: "",
    },
    isAmbulatory: {
      label: "Ambulatory or Hospital ?",
      options: ["Ambulatory", "Hospital"],
      defaultValue: true,
    },
    yearsQualified: {
      label: "Years qualified",
      defaultValue: 0,
    },
    gdprConfirmation: {
      label: "GDPR",
      defaultValue: false,
    },
  },
};
