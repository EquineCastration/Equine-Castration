import { View } from "react-native";

import { Formik } from "formik";
import { object, string, number } from "yup";

import { BasicPickerField } from "components/BasicPickerField";
import { InputField } from "components/InputField";
import { InitialValues, Layout } from "./InitialConsultationStepOne";
import { InitialConsultationStore } from "store/store";
import { initialConsultation } from "constants/initial-consultation";

export const InitialConsultationStepTwo = ({ navigation }) => {
  const keysArr = ["weight", "breed", "technique", "technique_other"];
  const fields = initialConsultation.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const validationSchema = object().shape({
    weight: number()
      .min(1, "Weight must be greater than 0")
      .positive()
      .required("Weight is required")
      .typeError("Weight must be a number"),
    breed: string()
      .oneOf(fields.breed.options, "Invalid breed")
      .required("Breed is required"),
    technique: string()
      .oneOf(fields.technique.options, "Invalid technique")
      .required("Technique is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        InitialConsultationStore.update((s) => {
          s.weight = values.weight;
          s.breed = values.breed;
          s.technique = values.technique;
          s.technique_other =
            values.technique === "Other" ? values.technique_other : ""; // only if the 'technique' is 'Other' else ''
        });
        navigation.navigate("InitialConsultationStepThree");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={2}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <InputField
                label={fields.weight.label}
                name="weight"
                // onChangeText={(value) =>
                //   setFieldValue(
                //     "weight",
                //     value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "")
                //   )
                // }
                keyboardType="numeric"
              />

              <BasicPickerField
                label={fields.breed.label}
                name="breed"
                pickerItems={fields.breed.options}
              />

              <BasicPickerField
                label={fields.technique.label}
                name="technique"
                pickerItems={fields.technique.options}
                numberOfLines={2}
              />

              {values?.technique === "Other" && (
                <InputField
                  label={fields.technique_other.label}
                  name="technique_other"
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
