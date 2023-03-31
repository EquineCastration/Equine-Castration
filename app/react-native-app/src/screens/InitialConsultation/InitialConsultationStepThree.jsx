import { View } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";
import { BasicPicker } from "components/BasicPicker";
import {
  FixedStepButton,
  InitialValues,
  Layout,
} from "./InitialConsultationStepOne";
import { InputField } from "components/InputField";

export const InitialConsultationStepThree = ({ navigation }) => {
  const keysArr = ["breed", "technique"];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  return (
    <Layout>
      <Formik
        initialValues={{ ...initialValues, otherTechnique: "" }}
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.breed = values.breed;
            s.technique = values.technique.startsWith("Other technique")
              ? "Other - " + values.otherTechnique // if other option is selected
              : values.technique;
          });
          navigation.navigate("InitialConsultationStepFour");
        }}
      >
        {({ handleSubmit, values, setFieldValue, handleChange }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicPicker
                label={fields.breed.label}
                fieldName="breed"
                value={values?.breed}
                setFieldValue={setFieldValue}
              >
                {fields.breed.options.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </BasicPicker>

              <BasicPicker
                label={fields.technique.label}
                fieldName="technique"
                value={values?.technique}
                setFieldValue={setFieldValue}
              >
                {fields.technique.options.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </BasicPicker>

              {values?.technique.startsWith("Other technique") && (
                <InputField
                  label={values.technique}
                  value={values?.otherTechnique}
                  onChangeText={handleChange("otherTechnique")}
                />
              )}
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="45%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
