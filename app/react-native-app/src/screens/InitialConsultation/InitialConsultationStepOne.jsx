import { useEffect } from "react";
import { Formik } from "formik";
import { InputField } from "../../components/InputField";
import { DatePickerField } from "../../components/DatePickerField";
import { ProgressBar } from "../../components/ProgressBar";
import { InitialConsulationStore } from "../../store/store";
import { db } from "../../store/db";
import { SafeAreaView, View, Button, ScrollView } from "react-native";
import { BasicHeader } from "../../components/BasicHeader";

export const Layout = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5">
        <BasicHeader
          primaryTxt="Initial Consultation"
          secondaryTxt="Input the following information"
        />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export const FixedStepButton = ({ onPress, title, progress }) => {
  return (
    <View className="my-6 justify-end">
      <Button onPress={onPress} title={title} />
      <ProgressBar progress={progress} />
    </View>
  );
};

export const InitialConsultationStepOne = ({ navigation }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists InititalConsultation (id integer primary key not null, horseName text, clientSurname text, dateOfCastration text, isLessThanTwo integer, ageAboveTwo integer, weight integer, breed text, technique text);"
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
            <FixedStepButton
              onPress={() => {
                handleSubmit();
                navigation.navigate("InitialConsultationStepTwo");
              }}
              title="Next"
              progress="25%"
            />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
