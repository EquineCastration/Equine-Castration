import { InputField } from "./InputField";
import { useBackendApi } from "contexts/BackendApi";
import { string } from "yup";

export const validationSchema = (emailName) => ({
  [emailName]: string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
});

// Validate email against registration rules
export const validationSchemaRegRules = (emailName) => {
  const {
    registrationRules: { validate },
  } = useBackendApi();

  return {
    [emailName]: validationSchema(emailName)[emailName].test(
      "Valid email",
      "Invalid email or email not allowed for registration.",
      async (value) => {
        if (!value) return;
        const email = value.toLowerCase();
        const res = await validate(email); // validate the email against the backend
        const { isValid } = await res.data;
        return isValid; // booleans
      }
    ),
  };
};

// Validate email based against registration rules and check if email is same as old one
export const validationSchemaExistingEmail = ({
  emailName,
  existingEmail,
}) => ({
  [emailName]: validationSchemaRegRules(emailName)[emailName].notOneOf(
    [existingEmail],
    "Email must be different than the current one"
  ),
});

export const EmailField = ({
  name,
  label,
  labelAlign,
  placeholder,
  labelColor,
  inputBorderColor,
  inputActiveBorderColor,
  ...props
}) => {
  return (
    <InputField
      name={name}
      label={label}
      labelAlign={labelAlign}
      placeholder={placeholder}
      labelColor={labelColor}
      inputBorderColor={inputBorderColor}
      inputActiveBorderColor={inputActiveBorderColor}
      type="email"
      {...props}
    />
  );
};
