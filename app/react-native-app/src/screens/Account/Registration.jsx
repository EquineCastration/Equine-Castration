import { ScrollView, View } from "react-native";

import { Formik } from "formik";

import { DefaultLayout } from "layout/DefaultLayout";
import { FixedStepButton } from "components/FixedStepButton";
import { InputField } from "components/InputField";
import { accountRegistration } from "constants/account-registration";
import { AccountRegistrationStore } from "store/AccountRegistrationStore";
import { useBackendApi } from "contexts/BackendApi";
import { validationSchemaRegRules as emailSchema } from "components/EmailField";
import { EmailField } from "components/EmailField";
import { object } from "yup";

const validationSchema = () =>
  object().shape({
    ...emailSchema("email"),
  });

const Layout = ({ children, onSubmit, current, title }) => {
  return (
    <DefaultLayout>
      <ScrollView
        style={{
          marginVertical: 2,
          marginHorizontal: 5,
          paddingHorizontal: 5,
        }}
      >
        {children}
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <FixedStepButton onPress={onSubmit} current={current} title={title} />
      </View>
    </DefaultLayout>
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

  const {
    registrationRules: { validate },
  } = useBackendApi();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema()}
      onSubmit={async (values) => {
        console.log(values);
        const res = await validate(values.email);
        console.log(res?.data);
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
            <InputField label={fields.name.label} name="name" />
            <EmailField label={fields.email.label} name="email" />
            <InputField label={fields.password.label} name="password" />
          </View>
        </Layout>
      )}
    </Formik>
  );
};
