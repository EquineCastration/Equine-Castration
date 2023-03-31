import { useEffect } from "react";
import { Formik } from "formik";
import { DatePickerField } from "components/DatePickerField";
import { ProgressBar } from "components/ProgressBar";
import {
  InitialConsultationStore,
  ICStoreInitialState,
  InitialConsultationForm,
} from "store/store";
import { View, ScrollView } from "react-native";
import { queryBase } from "db/queries/base";
import { InputField } from "components/InputField";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { DefaultLayout } from "layout/DefaultLayout";
import { object, string } from "yup";

export const validationSchema = () =>
  object().shape({
    horseName: string().required("Horse name required"),
    clientSurname: string().required("Client surname required"),
    dateOfCastration: string().required("Date of castration required"),
  });

// Standard layout for the multi-step form
export const Layout = ({ children }) => {
  return (
    <DefaultLayout>
      <ScrollView style={{ marginVertical: 10, marginHorizontal: 2 }}>
        {children}
      </ScrollView>
    </DefaultLayout>
  );
};

// Standard next step button component with progress bar
export const FixedStepButton = ({ onPress, title = "Next", progress }) => {
  return (
    <View
      style={{
        marginVertical: 12,
        justifyContent: "flex-end",
      }}
    >
      <BasicTouchableOpacity
        onPress={onPress}
        title={title}
        paddingVertical={3}
      />
      <ProgressBar progress={progress} />
    </View>
  );
};

export const InitialValues = (keysArr, store) => {
  // returns a new object containing selective key-value pairss
  // 'keysArr' is an string array of keys to look for in the 'store' object

  return Object.fromEntries(
    Object.keys(store)
      // filter the object keys
      .filter((key) => keysArr.includes(key))
      // iterate through filtered keys
      // create an array of two elements array with key and value [[key1, value],[key2, value]]
      // Object.fromEntries creates a new object using key and value of the array item
      .map((key) => [key, store[key]])
  );
};

export const InitialConsultationStepOne = ({ navigation }) => {
  useEffect(() => {
    // queryBase.deleteTable("InitialConsultation");
    queryBase.createTable("InitialConsultation", ICStoreInitialState); // Create table if not exists
  }, []);

  const keysArr = ["horseName", "clientSurname", "dateOfCastration"]; // these keys matches the keys set in the store
  const fields = InitialConsultationForm.fields;

  // passing store (an object which is either form fields default values or temporarily set values) and
  // relvant field names as an array (this should match with store obj keys)
  // the following function then returns a object with their values if available
  // which can be used as initial values in formik fields
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // add values to global store
          // each step/stage submission acts as temp submission
          // only after the confirmation screen, data is finally added to the db
          // this allow user to navigate back and forth between the screens/forms
          InitialConsultationStore.update((s) => {
            s.horseName = values.horseName;
            s.clientSurname = values.clientSurname;
            s.dateOfCastration = values.dateOfCastration;
          });
          navigation.navigate("InitialConsultationStepTwo");
        }}
      >
        {({ handleSubmit }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <InputField label={fields.horseName.label} name="horseName" />
              <InputField
                label={fields.clientSurname.label}
                name="clientSurname"
              />
              <DatePickerField
                name="dateOfCastration"
                label={fields.dateOfCastration.label}
                type="date"
              />
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="15%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
