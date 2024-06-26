import { useEffect, useState } from "react";
import { View } from "react-native";

import { Formik } from "formik";
import { boolean, number, object, string } from "yup";

import { accountRegistration } from "constants/account-registration";
import {
  AccountRegistrationStore,
  resetAccountRegistrationStore,
} from "store/AccountRegistrationStore";
import { useBackendApi } from "contexts/BackendApi";
import { AccountLayout } from "layout/AccountLayout";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { FixedStepButton } from "components/FixedStepButton";
import { InputField } from "components/forms";
import { validationSchema as emailSchema } from "components/forms/EmailField";
import { validationSchema as pwdSchema } from "components/forms/PasswordField";
import { EmailField } from "components/forms";
import { PasswordField } from "components/forms";
import { useUser } from "contexts/User";
import { ToggleField } from "components/forms";
import { Text } from "components/Text";
import { Spinner } from "components/Spinner";

const Layout = ({ children, onSubmit, current, steptitle, total = 3 }) => {
  return (
    <>
      {children}
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
  const keysArr = ["fullName", "email", "password", "isVeterinarian"];
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
          fullName: string().required("Full name required"),
          ...pwdSchema("password"),
          ...emailSchema("email"),
        })}
        onSubmit={async (values) => {
          AccountRegistrationStore.update((s) => {
            s.fullName = values.fullName;
            s.email = values.email;
            s.password = values.password;
            s.isVeterinarian = values.isVeterinarian;
          });
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
              <ToggleField
                variant="checkbox"
                label={fields.isVeterinarian.label}
                name="isVeterinarian"
              />
              <InputField
                label={fields.fullName.label}
                name="fullName"
                labelAlign="center"
              />
              <EmailField
                label={fields.email.label}
                name="email"
                labelAlign="center"
              />
              <PasswordField
                label={fields.password.label}
                name="password"
                labelAlign="center"
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
          yearsQualified: number()
            .typeError("Years qualified must be a number")
            .positive("Years qualified must be positive")
            .required("Years qualified required"),
        })}
        onSubmit={async (values) => {
          AccountRegistrationStore.update((s) => {
            s.institution = values.institution;
            s.isAmbulatory = values.isAmbulatory;
            s.yearsQualified = values.yearsQualified;
          });
          navigation.navigate("RegistrationStepGDPR");
        }}
      >
        {({ handleSubmit }) => (
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
              />
              <ToggleField
                label={fields.isAmbulatory.label}
                name="isAmbulatory"
              />
              <InputField
                label={fields.yearsQualified.label}
                name="yearsQualified"
                keyboardType="numeric"
                labelAlign="center"
              />
            </View>
          </Layout>
        )}
      </Formik>
    </AccountLayout>
  );
};

export const RegistrationStepGDPR = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState();
  const keysArr = ["gdprConfirmation", "isVeterinarian"];
  const { signIn } = useUser();

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const initialValues = InitialValues(
    keysArr,
    AccountRegistrationStore.useState()
  );

  const {
    account: { register },
  } = useBackendApi();

  const data = AccountRegistrationStore.useState();

  const handleRegistrationSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await register(data);
      setFeedback({
        status: "success",
        message: "Thank you for registering!",
      });

      resetAccountRegistrationStore(); // reset registration store
      signIn(res?.data); // sign in user
    } catch (e) {
      const error = await e.response;
      switch (error?.status) {
        case 400: {
          const result = error.data;
          let message =
            "There was an issue with your form submission. Please check for errors and try again.";
          if (result.isExistingUser)
            message =
              "There is already a user registered with that email address.";
          else if (result.isNotAllowlisted)
            message =
              "The email address provided is not eligible for registration.";

          setFeedback({ status: "error", message });
          break;
        }
        default:
          setFeedback({
            status: "error",
            message: "An unknown error has occurred.",
          });
      }
    }
    setIsLoading(false);
  };

  const Heading = ({ children }) => (
    <Text size="lg" weight="semiBold">
      {children}
      {"\n"}
    </Text>
  );

  return (
    <>
      {isLoading ? <Spinner text="Registering" /> : null}
      <AccountLayout
        primaryHeading="GDPR Consent Form"
        secondaryHeading="Please carefully read the GDPR consent form"
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
            AccountRegistrationStore.update((s) => {
              s.gdprConfirmation = values.gdprConfirmation;
            });
            await handleRegistrationSubmit();
          }}
        >
          {({ handleSubmit, values }) => (
            <Layout
              onSubmit={() => handleSubmit()}
              current={values.isVeterinarian ? 3 : 2}
              total={values.isVeterinarian ? 3 : 2}
              title="Complete registration"
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  gap: 20,
                }}
              >
                <Text size="md">
                  We take your privacy seriously and want to ensure that you
                  understand how we use your personal data. Please read the
                  following information carefully before you provide your
                  consent.
                  {"\n\n"}
                  <Heading>What data do we collect?</Heading>
                  We collect the following information from you: {"\n"}
                  [List of personal data collected, such as name, email address,
                  phone number, etc.]{"\n\n"}
                  <Heading>Why do we need your data?</Heading>
                  We collect your personal data to:{"\n"}
                  [List of purposes for which the data will be used, such as to
                  create and manage your account, to provide customer support,
                  to personalize your experience, etc.]{"\n\n"}
                  <Heading> Who will have access to your data?</Heading>
                  Your personal data will be accessible to: {"\n"}
                  [List of individuals or organizations that will have access to
                  your data, such as our employees, service providers, etc.]
                  {"\n\n"}
                  <Heading>How long do we keep your data?</Heading>
                  We will keep your personal data for as long as necessary to
                  fulfill the purposes for which it was collected, unless a
                  longer retention period is required by law. {"\n\n"}
                  <Heading>Your rights</Heading>
                  You have the right to: {"\n\n"}
                  Access and obtain a copy of your personal data {"\n"}
                  Correct any inaccuracies in your personal data {"\n"}
                  Object to the processing of your personal data{"\n"} Request
                  the deletion of your personal data {"\n"}Restrict the
                  processing of your personal data {"\n"}Data portability {"\n"}
                  Withdraw your consent at any time {"\n\n"}
                  By checking the box below, you consent to the processing of
                  your personal data as described in this form.
                </Text>
                <ToggleField
                  label="I have read and understood the information provided above and I consent to the processing of my personal data."
                  name="gdprConfirmation"
                />
              </View>
            </Layout>
          )}
        </Formik>
      </AccountLayout>
    </>
  );
};
