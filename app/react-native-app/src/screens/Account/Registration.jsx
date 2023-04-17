import { ScrollView, View } from "react-native";

import { Formik } from "formik";
import { object, string, boolean } from "yup";

import { DefaultLayout } from "layout/DefaultLayout";
import { FixedStepButton } from "components/FixedStepButton";
import { InputField } from "components/InputField";
import { accountRegistration } from "constants/account-registration";
import { AccountRegistrationStore } from "store/AccountRegistrationStore";
import { validationSchema as emailSchema } from "components/InputField";
import { useBackendApi } from "contexts/BackendApi";
import { useUserList } from "api/user";
import useSWR from "swr";

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

  // const { data } = useUserList();

  // const { data, error } = useSWR("https://smooth-taxes-jam-81-129-109-219.loca.lt/api/users", async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data;
  // });

  // console.log("data", data);

  const validationSchema = (emailName) =>
    object().shape({
      [emailName]: emailSchema.test(
        "backend-validation",
        "Email is not valid.",
        async (value) => {
          const email = value?.toLowerCase();
          const res = await validate(email);
          const json = await res.json();
          return json.isValid;
        }
      ),
    });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema("email")}
      onSubmit={async (values) => {
        console.log(values);
        const res = await validate(values.email);
        console.log(await res.json());
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
            <InputField label={fields.email.label} name="email" />
            <InputField label={fields.password.label} name="password" />
          </View>
        </Layout>
      )}
    </Formik>
  );
};
