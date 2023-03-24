import { useEffect } from "react";
import { Formik } from "formik";
import { InputField } from "../../components/InputField";
import { DatePickerField } from "../../components/DatePickerField";
import { ProgressBar } from "../../components/ProgressBar";
import { InitialConsulationStore } from "../../store/store";
import { db } from "../../store/db";
import { SafeAreaView, View, Button } from "react-native";
import { BasicHeader } from "../../components/BasicHeader";

export const Layout = ({ children, backNavigation }) => {
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
