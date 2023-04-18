import { View } from "react-native";

import { Formik } from "formik";
import { object, string, array, min } from "yup";

import { InputField } from "components/InputField";
import { MultiCheckBoxField } from "components/MultiCheckBoxField";
import { initialConsultation } from "constants/initial-consultation";

import { InitialConsultationStore } from "store/InitialConsultationStore";
import { Layout, InitialValues } from "./InitialConsultationStepOne";
import { BasicGroupOptionsField } from "components/BasicGroupOptionsField";

export const InitialConsultationStepFive = ({ navigation }) => {
  const keysArr = [
    "environment",
    "environment_other",
    "location",
    "location_other",
    "patientCleanliness",
    "patientCleanliness_other",
    "environmentCleanliness",
    "environmentCleanliness_other",
  ];
  const fields = initialConsultation.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const validationSchema = object().shape({
    environment: array()
      .of(string().oneOf(fields.environment.options, "Invalid value"))
      .min(1, "At least one environment is required"),
    location: string()
      .oneOf(fields.location.options, "Invalid location")
      .required("Location is required"),
    patientCleanliness: string()
      .oneOf(fields.patientCleanliness.options, "Invalid patient cleanliness")
      .required("Patient Cleanliness is required"),
    environmentCleanliness: string()
      .oneOf(
        fields.environmentCleanliness.options,
        "Invalid environment cleanliness"
      )
      .required("environment cleanliness is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        InitialConsultationStore.update((s) => {
          s.environment = values.environment;
          s.environment_other =
            values.environment === "Other" ? values.environment_other : ""; // only if the 'environment' is 'Other' else ''

          s.location = values.location;
          s.location_other =
            values.location === "Other" ? values.location_other : ""; // only if the 'location' is 'Other' else ''

          s.patientCleanliness = values.patientCleanliness;
          s.patientCleanliness_other =
            values.patientCleanliness === "Other"
              ? values.patientCleanliness_other
              : ""; // only if the 'patientCleanliness' is 'Other' else ''

          s.environmentCleanliness = values.environmentCleanliness;
          s.environmentCleanliness_other =
            values.environmentCleanliness === "Other"
              ? values.environmentCleanliness_other
              : ""; // only if the 'environmentCleanliness' is 'Other' else ''
        });
        navigation.navigate("InitialConsultationStepSix");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={5}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <MultiCheckBoxField
                name="environment"
                label={fields.environment.label}
                items={fields.environment.options}
              />
              {values?.environment.includes("Other") && (
                <InputField
                  label={fields.environment_other.label}
                  name="environment_other"
                />
              )}

              <BasicGroupOptionsField
                label={fields.location.label}
                name="location"
                options={fields.location.options}
              />
              {values?.location === "Other" && (
                <InputField
                  label={fields.location_other.label}
                  name="location_other"
                />
              )}

              <BasicGroupOptionsField
                label={fields.patientCleanliness.label}
                name="patientCleanliness"
                options={fields.patientCleanliness.options}
              />
              {values?.patientCleanliness === "Other" && (
                <InputField
                  label={fields.patientCleanliness_other.label}
                  name="patientCleanliness_other"
                />
              )}

              <BasicGroupOptionsField
                label={fields.environmentCleanliness.label}
                name="environmentCleanliness"
                options={fields.environmentCleanliness.options}
              />
              {values?.environmentCleanliness === "Other" && (
                <InputField
                  label={fields.environmentCleanliness_other.label}
                  name="environmentCleanliness_other"
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
