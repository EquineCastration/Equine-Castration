import { SafeAreaView, ScrollView, View } from "react-native";
import { Formik } from "formik";

import { CheckBox } from "../components/CheckBox";
import { InputField } from "../components/InputField";
import { DatePickerField } from "../components/DatePickerField";
import { InitialConsultationHeader } from "../components/InititalConsultation/InitialConsultationHeader";
import { BasicTouchableOpacity } from "../components/BasicTouchableOpacity";

import { InitialConsulationStore } from "../store/store";

export const InitialConsultationStepOne = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="pt-14 px-5">
        <InitialConsultationHeader />

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
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

export const InitialConsultationStepTwo = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="pt-14 px-5">
        <InitialConsultationHeader />

        <Formik
          initialValues={{
            isLessThanTwo: false,
          }}
          onSubmit={(values) => {
            InitialConsulationStore.update((s) => {
              s.isLessThanTwo = values.isLessThanTwo;
            });
            console.log(InitialConsulationStore.currentState);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
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
      </ScrollView>
    </SafeAreaView>
  );
};
