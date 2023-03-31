import { View } from "react-native";

import { Formik } from "formik";
import { object, string } from "yup";

import { InputField } from "components/InputField";
import { BasicGroupOptionsField } from "components/BasicGroupOptionsField";

import { InitialConsultationStore } from "store/store";
import { Layout, InitialValues } from "./InitialConsultationStepOne";
import { initialConsultation } from "constants/initial-consultation";

export const InitialConsultationStepSix = ({ navigation }) => {
  const keysArr = ["patientCompliance", "patientCompliance_other"];
  const fields = initialConsultation.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const validationSchema = object().shape({
    patientCompliance: string()
      .oneOf(fields.patientCompliance.options, "Invalid")
      .required("Patient Compliance is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        InitialConsultationStore.update((s) => {
          s.patientCompliance = values.patientCompliance;
          s.patientCompliance_other =
            values.patientCompliance === "Other"
              ? values.patientCompliance_other
              : ""; // only if the 'patientCompliance' is 'Other' else ''
        });
        navigation.navigate("InitialConsultationConfirmation");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={6}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicGroupOptionsField
                label={fields.patientCompliance.label}
                name="patientCompliance"
                options={fields.patientCompliance.options}
              />
              {values?.patientCompliance === "Other" && (
                <InputField
                  label={fields.patientCompliance_other.label}
                  name="patientCompliance_other"
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
