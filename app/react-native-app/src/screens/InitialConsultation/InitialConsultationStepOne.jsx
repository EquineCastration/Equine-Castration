import { View, ScrollView } from "react-native";
import { useEffect } from "react";

import { Formik } from "formik";
import { object, string, boolean } from "yup";

import { DefaultLayout } from "layout/DefaultLayout";
import { DatePickerField } from "components/DatePickerField";
import { FixedStepButton } from "components/FixedStepButton";
import { InputField } from "components/InputField";
import { CheckBoxField } from "components/CheckBoxField";
import { BasicPickerField } from "components/BasicPickerField";

import {
  InitialConsultationStore,
  ICStoreInitialState,
} from "store/InitialConsultationStore";
import { queryBase } from "db/queries/base";
import { initialConsultation } from "constants/initial-consultation";

const validationSchema = object().shape({
  horseName: string().required("Horse name required"),
  clientSurname: string().required("Client surname required"),
  dateOfCastration: string().required("Date of castration required"),
  isLessThanTwo: boolean(),
  // TO DO: could be an issue with Picker component of BasicPicker unable to handle numbers.
  // ageAboveTwo: number()
  //   .typeError("Age must be a number")
  //   .when("isLessThanTwo", {
  //     is: true,
  //     then: number().max(2, "Age cannot be more than 2 years old"),
  //     otherwise: number()
  //       .required("Age is required")
  //       .min(3, "Age must be at least 3 years old")
  //       .max(10, "Age cannot be more than 10 years old"),
  //   }),
});

// Standard layout for the multi-step form
export const Layout = ({ children, onSubmit, current, title }) => {
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
        <FixedStepButton
          onPress={onSubmit}
          current={current}
          title={title}
          total={7}
        />
      </View>
    </DefaultLayout>
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

const agePickerItems = (min, max) => {
  const minAge = min;
  const maxAge = max;
  let item = [];

  for (let i = minAge; i <= maxAge; i++) {
    item.push(i);
  }
  return item;
};

export const InitialConsultationStepOne = ({ navigation }) => {
  useEffect(() => {
    // queryBase.deleteTable("InitialConsultation");
    queryBase.createTable("InitialConsultation", ICStoreInitialState); // Create table if not exists
  }, []);

  const keysArr = [
    "horseName",
    "clientSurname",
    "dateOfCastration",
    "isLessThanTwo",
    "ageAboveTwo",
  ]; // these keys matches the keys set in the store
  const fields = initialConsultation.fields;

  // passing store (an object which is either form fields default values or temporarily set values) and
  // relvant field names as an array (this should match with store obj keys)
  // the following function then returns a object with their values if available
  // which can be used as initial values in formik fields
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  console.log(InitialConsultationStore.useState());

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // add values to global store
        // each step/stage submission acts as temp submission
        // only after the confirmation screen, data is finally added to the db
        // this allow user to navigate back and forth between the screens/forms
        InitialConsultationStore.update((s) => {
          s.horseName = values.horseName;
          s.clientSurname = values.clientSurname;
          s.dateOfCastration = values.dateOfCastration;
          s.isLessThanTwo = values.isLessThanTwo;
          !values.isLessThanTwo && (s.ageAboveTwo = values.ageAboveTwo);
        });
        navigation.navigate("InitialConsultationStepTwo");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={1}>
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

              <CheckBoxField
                name="isLessThanTwo"
                label={fields.isLessThanTwo.label}
              />

              {!values?.isLessThanTwo && (
                <BasicPickerField
                  name="ageAboveTwo"
                  label={"Select age"}
                  pickerItems={agePickerItems(3, 10)}
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
