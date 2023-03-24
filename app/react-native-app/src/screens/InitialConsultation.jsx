import { SafeAreaView, ScrollView, View } from "react-native";
import { Formik } from "formik";

import { CheckBox } from "../components/CheckBox";
import { InputField } from "../components/InputField";
import { DatePickerField } from "../components/DatePickerField";
import { InitialConsultationHeader } from "../components/InititalConsultation/InitialConsultationHeader";
import { BasicTouchableOpacity } from "../components/BasicTouchableOpacity";

import { InitialConsulationStore } from "../store/store";

import * as SQLite from "expo-sqlite";
import { Children, useEffect } from "react";

const db = SQLite.openDatabase("InititalConsultation.db");

const addInitialConsultation = () => {
  const data = InitialConsulationStore.currentState;

  db.transaction((tx) => {
    tx.executeSql(
      "insert into InititalConsultation (horseName, clientSurname, dateOfCastration, isLessThanTwo) values (?, ?, ?, ?)",
      [
        data.horseName,
        data.clientSurname,
        data.dateOfCastration,
        data.isLessThanTwo,
      ],
      () => {},
      () => {
        console.log("Error creating table");
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM InititalConsultation where id = 1",
      [],
      (tx, results) => {
        console.log("Query completed");
        console.log(results);
      },
      () => console.log("Error getting data")
    );
  });
};

const Layout = ({ children, backTarget }) => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mt-8 px-5">
        <InitialConsultationHeader className="mt-10" backTarget={backTarget} />
        {children}
      </ScrollView>
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

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM InititalConsultation where id = 1",
        [],
        (tx, results) => console.log(results.rows._array),
        () => console.log("Error getting data")
      );
    });
  }, []);

  return (
    <Layout>
      <Formik
        initialValues={{
          horseName: "",
          clientSurname: "",
          dateOfCastration: "",
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
            <BasicTouchableOpacity
              title="Next"
              onPress={() => {
                handleSubmit();
                navigation.navigate("InitialConsultationStepTwo");
              }}
            />
          </View>
        )}
      </Formik>
    </Layout>
  );
};

export const InitialConsultationStepTwo = () => {
  return (
    <Layout backTarget="true">
      <Formik
        initialValues={{
          isLessThanTwo: false,
        }}
        onSubmit={(values) => {
          InitialConsulationStore.update((s) => {
            s.isLessThanTwo = values.isLessThanTwo;
          });
          console.log(InitialConsulationStore.currentState);
          addInitialConsultation();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View className="my-2">
            <CheckBox
              label="Is horse less than 2 years old ?"
              value={values?.isLessThanTwo}
              onValueChange={(isLessThanTwo) =>
                setFieldValue("isLessThanTwo", isLessThanTwo)
              }
            />
            <BasicTouchableOpacity title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
