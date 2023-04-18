import { View } from "react-native";

import { Formik } from "formik";
import { object, string } from "yup";

import { BasicPickerField } from "components/BasicPickerField";
import { InputField } from "components/InputField";
import { BasicGroupOptionsField } from "components/BasicGroupOptionsField";

import { InitialConsultationStore } from "store/InitialConsultationStore";
import { Layout, InitialValues } from "./InitialConsultationStepOne";
import { initialConsultation } from "constants/initial-consultation";

export const InitialConsultationStepFour = ({ navigation }) => {
  const keysArr = [
    "skinClosure",
    "skinClosure_other",
    "restraint",
    "restraint_standing",
  ];
  const fields = initialConsultation.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const validationSchema = object().shape({
    skinClosure: string()
      .oneOf(fields.skinClosure.options, "Invalid skin closure")
      .required("Skin Closure required"),
    restraint: string()
      .oneOf(fields.restraint.options, "Invalid restraint")
      .required("Restraint required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        InitialConsultationStore.update((s) => {
          s.skinClosure = values.skinClosure;
          s.skinClosure_other =
            values.skinClosure === "Other" ? values.skinClosure_other : ""; // only if the 'skinClosure' is 'Other' else ''
          s.restraint = values.restraint;
          s.restraint_standing =
            values.restraint === "Standing" ? values.restraint_standing : ""; // only if the 'restraint' is 'Standing' else ''
        });
        navigation.navigate("InitialConsultationStepFive");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={4}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicPickerField
                label={fields.skinClosure.label}
                name="skinClosure"
                pickerItems={fields.skinClosure.options}
              />

              {values?.skinClosure === "Other" && (
                <InputField
                  label={fields.skinClosure_other.label}
                  name="skinClosure_other"
                />
              )}

              <BasicGroupOptionsField
                label={fields.restraint.label}
                name="restraint"
                options={fields.restraint.options}
              />

              {values?.restraint === "Standing" && (
                <BasicGroupOptionsField
                  label={fields.restraint_standing.label}
                  name="restraint_standing"
                  options={fields.restraint_standing.options}
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
