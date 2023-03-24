import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Formik } from "formik";

import { CheckBox } from "../components/CheckBox";
import { InputField } from "../components/InputField";
import { DatePickerField } from "../components/DatePickerField";
import colors from "../configs/colors";
import { BasicTouchableOpacity } from "../components/BasicTouchableOpacity";

export const InitialConsutation = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="pt-14 px-5">
        <Text className="font-bold text-4xl" style={{ color: colors.primary }}>
          Initial Consulation
        </Text>
        <Text className="font-normal text-xl" style={{ color: colors.lghtTxt }}>
          Input the following information
        </Text>

        <Formik
          initialValues={{
            horseName: "",
            clientSurname: "",
            dateOfCastration: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View className="my-5">
              <InputField
                label="Horse name:"
                onChangeText={handleChange("horseName")}
                value={values.horseName}
              />
              <InputField
                label="Client surname:"
                onChangeText={handleChange("clientSurname")}
                value={values.clientSurname}
              />
              <DatePickerField
                name="dateOfCastration"
                label="Date of castration:"
                type="date"
                value={values.dateOfCastration}
                setFieldValue={setFieldValue}
              />
              <CheckBox label="Is horse less than 2 years old ?" />
              <BasicTouchableOpacity title="Submit" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
