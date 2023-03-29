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

export const InitialValues = (keysArr, fields, store) => {
  return Object.fromEntries(
    Object.keys(fields)
      .filter((key) => keysArr.includes(key))
      .map((key) => [key, store[key]])
  );
};

export const InitialConsultationStepOne = ({ navigation }) => {
  useEffect(() => {
    // queryBase.deleteTable("InitialConsultation");
    queryBase.createTable("InitialConsultation", ICStoreInitialState); // Create table if not exists
  }, []);

  const keysArr = ["horseName", "clientSurname", "dateOfCastration"];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    fields,
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
            <FixedStepButton onPress={handleSubmit} progress="25%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
