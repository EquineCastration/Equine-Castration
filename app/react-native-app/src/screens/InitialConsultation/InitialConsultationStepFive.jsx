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
    "environmentOther",
    "location",
    "locationOther",
    "patientCleanliness",
    "patientCleanlinessOther",
    "environmentCleanliness",
    "environmentCleanlinessOther",
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
          s.environmentOther = values.environment.includes("Other")
            ? values.environmentOther
            : ""; // only if the 'environment' is 'Other' else ''

          s.location = values.location;
          s.locationOther =
            values.location === "Other" ? values.locationOther : ""; // only if the 'location' is 'Other' else ''

          s.patientCleanliness = values.patientCleanliness;
          s.patientCleanlinessOther =
            values.patientCleanliness === "Other"
              ? values.patientCleanlinessOther
              : ""; // only if the 'patientCleanliness' is 'Other' else ''

          s.environmentCleanliness = values.environmentCleanliness;
          s.environmentCleanlinessOther =
            values.environmentCleanliness === "Other"
              ? values.environmentCleanlinessOther
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
                  label={fields.environmentOther.label}
                  name="environmentOther"
                />
              )}

              <BasicGroupOptionsField
                label={fields.location.label}
                name="location"
                options={fields.location.options}
              />
              {values?.location === "Other" && (
                <InputField
                  label={fields.locationOther.label}
                  name="locationOther"
                />
              )}

              <BasicGroupOptionsField
                label={fields.patientCleanliness.label}
                name="patientCleanliness"
                options={fields.patientCleanliness.options}
              />
              {values?.patientCleanliness === "Other" && (
                <InputField
                  label={fields.patientCleanlinessOther.label}
                  name="patientCleanlinessOther"
                />
              )}

              <BasicGroupOptionsField
                label={fields.environmentCleanliness.label}
                name="environmentCleanliness"
                options={fields.environmentCleanliness.options}
              />
              {values?.environmentCleanliness === "Other" && (
                <InputField
                  label={fields.environmentCleanlinessOther.label}
                  name="environmentCleanlinessOther"
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
