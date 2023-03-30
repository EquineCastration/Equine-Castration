import { useEffect } from "react";
import { Formik } from "formik";
import { DatePickerField } from "components/DatePickerField";
import { ProgressBar } from "components/ProgressBar";
import { BasicHeader } from "components/BasicHeader";
import {
  InitialConsultationStore,
  ICStoreInitialState,
  InitialConsultationForm,
} from "store/store";
import { SafeAreaView, View, ScrollView } from "react-native";
import { queryBase } from "db/queries/base";
import { InputField } from "components/InputField";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";

export const Layout = ({
  children,
  secondaryTxt = "Input the following information",
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <BasicHeader
          primaryTxt="Initial Consultation"
          secondaryTxt={secondaryTxt}
        />
        <View style={{ marginVertical: 7, marginHorizontal: 5 }}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
      // create an array of single key-value (two elements) pair object [{key1: value},{key2: value}]
      // Object.fromEntries creates a new object using key and value of the array item
      .map((key) => ({ [key]: store[key] })) // this works as well [key, store[key]]
  );
};

export const InitialConsultationStepOne = ({ navigation }) => {
  useEffect(() => {
    // queryBase.deleteTable("InitialConsultation");
    queryBase.createTable("InitialConsultation", ICStoreInitialState); // Create table if not exists
  }, []);

  const keysArr = ["horseName", "clientSurname", "dateOfCastration"]; // these keys matches the keys set in the store
  const fields = InitialConsultationForm.fields;

  // Since we have already declared default value for relevant fields,
  // we can pass that and
  // relvant field names (this should match with store obj keys) as an array
  // the following function then returns default values
  // which can be used as initial values in formik fields
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        // adding values to global store
        // each step/stage submission acts as temp submission
        // only after the confirmation screen, data is added to the db
        // this allow user to navigate back and forth between the screens/forms
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.horseName = values.horseName;
            s.clientSurname = values.clientSurname;
            s.dateOfCastration = values.dateOfCastration;
          });
          navigation.navigate("InitialConsultationStepTwo");
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <InputField
                label={fields.horseName.label}
                onChangeText={handleChange("horseName")}
                value={values?.horseName}
              />
              <InputField
                label={fields.clientSurname.label}
                onChangeText={handleChange("clientSurname")}
                value={values?.clientSurname}
              />
              <DatePickerField
                name="dateOfCastration"
                label={fields.dateOfCastration.label}
                type="date"
                value={values?.dateOfCastration}
                setFieldValue={setFieldValue}
              />
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="15%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
