import { SafeAreaView, View, Button, ToastAndroid } from "react-native";
import { Formik } from "formik";
import { CheckBox } from "../components/CheckBox";
import { InputField } from "../components/InputField";
import { DatePickerField } from "../components/DatePickerField";
import { BasicHeader } from "../components/BasicHeader";
import { ProgressBar } from "../components/ProgressBar";
import { InitialConsulationStore } from "../store/store";
import { db } from "../store/db";
import { useEffect } from "react";

const handleInitialConsultationSubmit = (navigation, data) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into InititalConsultation (horseName, clientSurname, dateOfCastration, isLessThanTwo) values (?, ?, ?, ?)",
      [
        data?.horseName,
        data?.clientSurname,
        data?.dateOfCastration,
        data?.isLessThanTwo,
      ],
      (_, result) => {
        result.rowsAffected > 0
          ? ToastAndroid.show(
              "Initial Consultation record created",
              ToastAndroid.SHORT
            ) // only works in Android
          : ToastAndroid.show(
              "Failed Creating Initial Consultation record",
              ToastAndroid.SHORT
            ); // only works in Android
      },
      (_, err) => console.log("Error creating table", err)
    );
  });

  InitialConsulationStore.replace({
    horseName: "",
    clientSurname: "",
    dateOfCastration: "",
    isLessThanTwo: false,
    progress: 0,
  });
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

const Layout = ({ children, backNavigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mt-8 px-5">
        <BasicHeader
          primaryTxt="Initial Consultation"
          secondaryTxt="Input the following information"
          backNavigation={backNavigation}
        />
        {children}
      </View>
    </SafeAreaView>
  );
};

export const InitialConsultationStepOne = ({ navigation }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists InititalConsultation (id integer primary key not null, horseName text, clientSurname text, dateOfCastration text, isLessThanTwo integer);"
      );
    });
  }, []);

  const data = InitialConsulationStore.useState();

  return (
    <Layout>
      <Formik
        enableReinitialize
        initialValues={{
          horseName: data?.horseName || "",
          clientSurname: data?.clientSurname || "",
          dateOfCastration: data?.dateOfCastration || "",
        }}
        onSubmit={(values) => {
          // adding values to global store
          InitialConsulationStore.update((s) => {
            s.horseName = values.horseName;
            s.clientSurname = values.clientSurname;
            s.dateOfCastration = values.dateOfCastration;
          });
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <View className="flex-1">
            <View className="my-2">
              <InputField
                label="Horse name:"
                onChangeText={handleChange("horseName")}
                value={values?.horseName}
              />
              <InputField
                label="Client surname:"
                onChangeText={handleChange("clientSurname")}
                value={values?.clientSurname}
              />
              <DatePickerField
                name="dateOfCastration"
                label="Date of castration:"
                type="date"
                value={values?.dateOfCastration}
                setFieldValue={setFieldValue}
              />
            </View>
            <View className="justify-end mb-12 flex-1">
              <Button
                onPress={() => {
                  handleSubmit();
                  navigation.navigate("InitialConsultationStepTwo");
                }}
                title="Next"
              />
              <ProgressBar progress="25%" />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};

export const InitialConsultationStepTwo = ({ navigation }) => {
  const data = InitialConsulationStore.useState();

  return (
    <Layout backNavigation={() => navigation.goBack()}>
      <Formik
        initialValues={{
          isLessThanTwo: data?.isLessThanTwo || false,
        }}
        onSubmit={(values) => {
          InitialConsulationStore.update((s) => {
            s.isLessThanTwo = values.isLessThanTwo;
          });
          handleInitialConsultationSubmit(navigation, data);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View className="flex-1">
            <View className="my-2">
              <CheckBox
                label="Is horse less than 2 years old ?"
                value={values?.isLessThanTwo}
                onValueChange={(isLessThanTwo) =>
                  setFieldValue("isLessThanTwo", isLessThanTwo)
                }
              />
            </View>
            <View className="justify-end mb-12 flex-1">
              <Button onPress={handleSubmit} title="submit" />
              <ProgressBar progress="100%" />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};
