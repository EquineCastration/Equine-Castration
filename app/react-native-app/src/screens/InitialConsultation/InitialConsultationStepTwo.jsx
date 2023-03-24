import { View, Button } from "react-native";
import { Layout } from "./InitialConsultationStepOne";
import { InitialConsulationStore } from "../../store/store";
import { Formik } from "formik";
import { CheckBox } from "../../components/CheckBox";
import { ProgressBar } from "../../components/ProgressBar";
import { Picker } from "@react-native-picker/picker";
import { BasicPicker } from "../../components/BasicPicker";
import { InputField } from "../../components/InputField";

const AgePickerItem = () => {
  const minAge = 3;
  const maxAge = 20;
  let item = [];

  for (let i = minAge; i <= maxAge; i++) {
    item.push(<Picker.Item key={i} label={i.toString()} value={i} />);
  }
  return item;
};

export const InitialConsultationStepTwo = ({ navigation }) => {
  const data = InitialConsulationStore.useState();

  return (
    <Layout backNavigation={() => navigation.goBack()}>
      <Formik
        initialValues={{
          isLessThanTwo: data?.isLessThanTwo || false,
          ageAboveTwo: data?.ageAboveTwo || 0,
          weight: data?.weight || 0,
        }}
        onSubmit={(values) => {
          InitialConsulationStore.update((s) => {
            s.isLessThanTwo = values.isLessThanTwo;
            values.isLessThanTwo && (s.ageAboveTwo = values.ageAboveTwo);
            s.weight = values.weight;
          });
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View className="flex-1">
            <View className="my-2">
              <CheckBox
                label="Is horse less than 2 years old ?"
                value={values?.isLessThanTwo}
                onValueChange={(isLessThanTwo) => {
                  setFieldValue("isLessThanTwo", isLessThanTwo);
                  !isLessThanTwo && setFieldValue("ageAboveTwo", 0);
                }}
              />
              {values?.isLessThanTwo && (
                <BasicPicker
                  label="Age:"
                  fieldName="ageAboveTwo"
                  value={values?.ageAboveTwo}
                  setFieldValue={setFieldValue}
                >
                  {AgePickerItem()}
                </BasicPicker>
              )}
              <InputField
                label="Weight:"
                onChangeText={(value) =>
                  setFieldValue(
                    "weight",
                    value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
                  )
                }
                value={values?.weight.toString()}
                keyboardType="numeric"
              />
            </View>
            <View className="justify-end mb-12 flex-1">
              <Button
                onPress={() => {
                  handleSubmit();
                  navigation.navigate("InitialConsultationStepThree");
                }}
                title="Next"
              />
              <ProgressBar progress="55%" />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};
