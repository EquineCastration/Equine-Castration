import { ScrollView, View } from "react-native";

import { Formik } from "formik";

import { FixedStepButton } from "components/FixedStepButton";
import { InputField } from "components/InputField";
import { accountRegistration } from "constants/account-registration";
import { AccountRegistrationStore } from "store/AccountRegistrationStore";
import { validationSchemaRegRules as emailSchema } from "components/EmailField";
import { validationSchema as pwdSchema } from "components/PasswordField";
import { EmailField } from "components/EmailField";
import { object, string } from "yup";
import { AccountLayout } from "./AccountLayout";
import { colors } from "style/style";
import { PasswordField } from "components/PasswordField";

const Layout = ({ children, onSubmit, current, steptitle }) => {
  return (
    <>
      <ScrollView
        style={{
          marginVertical: 2,
        }}
      >
        {children}
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <FixedStepButton
          onPress={onSubmit}
          current={current}
          title={steptitle}
        />
      </View>
    </>
  );
};

const InitialValues = (keysArr, store) => {
  // returns a new object containing selective key-value pairss
  // 'keysArr' is an string array of keys to look for in the 'store' object
  return Object.fromEntries(
    Object.keys(store)
      .filter((key) => keysArr.includes(key))
      .map((key) => [key, store[key]])
  );
};

export const RegistrationStepOne = ({ navigation }) => {
  const keysArr = ["name", "email", "password"];
  const fields = accountRegistration.fields;
  const initialValues = InitialValues(
    keysArr,
    AccountRegistrationStore.useState()
  );

  return (
    <AccountLayout
      primaryHeading="Register"
      secondaryHeading="Please register to use the app"
      backBtn
    >
      <Formik
        initialValues={initialValues}
        validationSchema={object().shape({
          name: string().required("Name required"),
          ...pwdSchema("password"),
          ...emailSchema("email"),
        })}
        onSubmit={async (values) => {
          console.log(values);
          // TODO: Handle submission
        }}
      >
        {({ handleSubmit, values }) => (
          <Layout onSubmit={() => handleSubmit()} current={1}>
            <View
              style={{
                flex: 1,
                gap: 20,
              }}
            >
              <InputField
                label={fields.name.label}
                name="name"
                labelAlign="center"
                bgColor={colors.light}
              />
              <EmailField
                label={fields.email.label}
                name="email"
                labelAlign="center"
                bgColor={colors.light}
              />
              <PasswordField
                label={fields.password.label}
                name="password"
                labelAlign="center"
                bgColor={colors.light}
              />
            </View>
          </Layout>
        )}
      </Formik>
    </AccountLayout>
  );
};

export const RegistrationStepTwo = ({ navigation }) => {
  const keysArr = [
    "institution",
    "isAmbulatory",
    "yearsQualified",
    "gdprConfirmation",
  ];
  const fields = accountRegistration.fields;
  const initialValues = InitialValues(
    keysArr,
    AccountRegistrationStore.useState()
  );

  return (
    <AccountLayout
      primaryHeading="Register"
      secondaryHeading="Please register to use the app"
      backBtn
    >
      <Formik
        initialValues={initialValues}
        validationSchema={object().shape({
          name: string().required("Name required"),
          ...pwdSchema("password"),
          ...emailSchema("email"),
        })}
        onSubmit={async (values) => {
          console.log(values);
          // TODO: Handle submission
        }}
      >
        {({ handleSubmit, values }) => (
          <Layout onSubmit={() => handleSubmit()} current={1}>
            <View
              style={{
                flex: 1,
                gap: 20,
              }}
            >
              <InputField
                label={fields.institution.label}
                name="institution"
                labelAlign="center"
                bgColor={colors.light}
              />
              <EmailField
                label={fields.email.label}
                name="email"
                labelAlign="center"
                bgColor={colors.light}
              />
              <InputField
                label={fields.yearsQualified.label}
                name="yearsQualified"
                keyboardType="numeric"
                labelAlign="center"
                bgColor={colors.light}
              />
            </View>
          </Layout>
        )}
      </Formik>
    </AccountLayout>
  );
};
