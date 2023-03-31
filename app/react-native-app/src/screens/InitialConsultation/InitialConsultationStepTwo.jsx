import { View } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { CheckBoxField } from "components/CheckBoxField";
import { BasicPicker } from "components/BasicPicker";
import { InputField } from "components/InputField";
import {
  FixedStepButton,
  InitialValues,
  Layout,
} from "./InitialConsultationStepOne";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";

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
  const keysArr = ["isLessThanTwo", "ageAboveTwo", "weight"];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.isLessThanTwo = values.isLessThanTwo;
            !values.isLessThanTwo && (s.ageAboveTwo = values.ageAboveTwo);
            s.weight = values.weight;
          });
          navigation.navigate("InitialConsultationStepThree");
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <CheckBoxField
                label={fields.isLessThanTwo.label}
                value={values?.isLessThanTwo}
                onValueChange={(isLessThanTwo) => {
                  setFieldValue("isLessThanTwo", isLessThanTwo);
                  !isLessThanTwo && setFieldValue("ageAboveTwo", 0);
                }}
              />
              {!values?.isLessThanTwo && (
                <BasicPicker
                  label={fields.ageAboveTwo.label}
                  fieldName="ageAboveTwo"
                  value={values?.ageAboveTwo}
                  setFieldValue={setFieldValue}
                >
                  {AgePickerItem()}
                </BasicPicker>
              )}
              <InputField
                label={fields.weight.label}
                name="weight"
                // onChangeText={(value) =>
                //   setFieldValue(
                //     "weight",
                //     value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
                //   )
                // }
                value={values?.weight.toString()}
                keyboardType="numeric"
              />
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="25%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
