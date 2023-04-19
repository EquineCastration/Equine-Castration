import { ScrollView, View, Text } from "react-native";

import { Formik, useField } from "formik";

import { FixedStepButton } from "components/FixedStepButton";
import { InputField } from "components/InputField";
import { accountRegistration } from "constants/account-registration";
import { AccountRegistrationStore } from "store/AccountRegistrationStore";
import { validationSchemaRegRules as emailSchema } from "components/EmailField";
import { validationSchema as pwdSchema } from "components/PasswordField";
import { EmailField } from "components/EmailField";
import { boolean, object, string } from "yup";
import { AccountLayout } from "./AccountLayout";
import { colors, font } from "style/style";
import { PasswordField } from "components/PasswordField";
import { CheckBoxField } from "components/CheckBoxField";

const Layout = ({ children, onSubmit, current, steptitle, total = 3 }) => {
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
          total={total}
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
  const keysArr = ["name", "email", "password", "isVeterinarian"];
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
          values.isVeterinarian
            ? navigation.navigate("RegistrationStepTwo")
            : navigation.navigate("RegistrationStepGDPR");
        }}
      >
        {({ handleSubmit, values }) => (
          <Layout
            onSubmit={() => handleSubmit()}
            total={values.isVeterinarian ? 3 : 2} // Update progress value
            current={1}
          >
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
              <CheckBoxField
                label={fields.isVeterinarian.label}
                name="isVeterinarian"
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
  const keysArr = ["institution", "isAmbulatory", "yearsQualified"];
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
          institution: string().required("Name required"),
        })}
        onSubmit={async (values) => {
          console.log(values);
          // TODO: Handle submission
          navigation.navigate("RegistrationStepGDPR");
        }}
      >
        {({ handleSubmit, values }) => (
          <Layout onSubmit={() => handleSubmit()} current={2}>
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
              <CheckBoxField
                label={fields.isAmbulatory.label}
                name="isAmbulatory"
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

export const RegistrationStepGDPR = ({ navigation }) => {
  const keysArr = ["gdprConfirmation", "isVeterinarian"];
  const fields = accountRegistration.fields;
  const initialValues = InitialValues(
    keysArr,
    AccountRegistrationStore.useState()
  );

  const Heading = ({ children }) => (
    <Text style={{ fontSize: font.size["lg"], fontWeight: 400 }}>
      {children}
      {"\n"}
    </Text>
  );

  return (
    <AccountLayout
      primaryHeading="GDPR Consent Form"
      secondaryHeading="Please carefully read the GDPR consent"
      backBtn
    >
      <Formik
        initialValues={initialValues}
        validationSchema={object().shape({
          gdprConfirmation: boolean()
            .required("GDPR consent form must be accepted.")
            .oneOf([true], "GDPR consent form must be accepted."),
        })}
        onSubmit={async (values) => {
          console.log(values);
          // TODO: Handle submission
        }}
      >
        {({ handleSubmit, values }) => (
          <Layout
            onSubmit={() => handleSubmit()}
            current={values.isVeterinarian ? 3 : 2}
            total={values.IsVeterinarian ? 3 : 2}
            title="Complete registration"
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
                gap: 20,
              }}
            >
              <Text
                style={{
                  fontSize: font.size["md"],
                  fontWeight: 300,
                  lineHeight: 28,
                  color: colors.primary[700],
                }}
              >
                We take your privacy seriously and want to ensure that you
                understand how we use your personal data. Please read the
                following information carefully before you provide your consent.
                {"\n\n"}
                <Heading>What data do we collect?</Heading>
                We collect the following information from you: {"\n"}
                [List of personal data collected, such as name, email address,
                phone number, etc.]{"\n\n"}
                <Heading>Why do we need your data?</Heading>
                We collect your personal data to:{"\n"}
                [List of purposes for which the data will be used, such as to
                create and manage your account, to provide customer support, to
                personalize your experience, etc.]{"\n\n"}
                <Heading> Who will have access to your data?</Heading>
                Your personal data will be accessible to: {"\n"}
                [List of individuals or organizations that will have access to
                your data, such as our employees, service providers, etc.]
                {"\n\n"}
                <Heading>How long do we keep your data?</Heading>
                We will keep your personal data for as long as necessary to
                fulfill the purposes for which it was collected, unless a longer
                retention period is required by law. {"\n\n"}
                <Heading>Your rights</Heading>
                You have the right to: {"\n\n"}
                Access and obtain a copy of your personal data {"\n"}
                Correct any inaccuracies in your personal data {"\n"}
                Object to the processing of your personal data{"\n"} Request the
                deletion of your personal data {"\n"}Restrict the processing of
                your personal data {"\n"}Data portability {"\n"}Withdraw your
                consent at any time {"\n\n"}
                By checking the box below, you consent to the processing of your
                personal data as described in this form.
              </Text>
              <CheckBoxField
                label="I have read and understood the information provided above and I consent to the processing of my personal data."
                name="gdprConfirmation"
              />
            </View>
          </Layout>
        )}
      </Formik>
    </AccountLayout>
  );
};
