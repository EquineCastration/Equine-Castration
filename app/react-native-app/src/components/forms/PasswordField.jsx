import { InputField } from "./InputField";
import { string } from "yup";

const minLength = 6;
export const validationSchema = (pwdName) => ({
  [pwdName]: string()
    .min(minLength, `Passwords must be at least ${minLength} characters`, {
      minLength,
    })
    .matches(/\d/, "Passwords must have at least one digit ('0' - '9').")
    .matches(
      /[A-Z]/,
      "Passwords must have at least one uppercase character ('A' - 'Z')."
    )
    .matches(
      /[a-z]/,
      "Passwords must have at least one lowercase character ('a' - 'z')."
    )
    .matches(
      /[^A-Za-z0-9]/,
      "Passwords must have at least one non-alphanumeric character."
    )
    .required("Please enter a password"),
});

export const PasswordField = ({
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
      type="password"
      {...props}
    />
  );
};
