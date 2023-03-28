import { View } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "components/CheckBox";
import { Layout } from "./InitialConsultationStepOne";
import { BasicPicker } from "components/BasicPicker";
import { InputField } from "components/InputField";
import { FixedStepButton } from "./InitialConsultationStepOne";
import { InitialConsulationStore } from "store/store";

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
    <Layout>
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
            <FixedStepButton
              onPress={() => {
                handleSubmit();
                navigation.navigate("InitialConsultationStepThree");
              }}
              title="Next"
              progress="55%"
            />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
