import { Formik } from "formik";
import { object, string } from "yup";
import { GroupCheckBoxField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";

export const InitialConsultationStepSix = ({ navigation }) => {
  const keysArr = [
    "restraint",
    "location",
    "locationOther",
    "environmentCleanliness",
    "environmentCleanlinessOther",
    "patientCleanliness",
    "patientCleanlinessOther",
  ];
  const fields = initialConsultation.fields;
  const initialValues = useInitialValues(keysArr);

  const validationSchema = object().shape({
    restraint: string()
      .oneOf(fields.restraint.options, "Invalid option")
      .required("Please select an option"),
    location: string()
      .oneOf(fields.location.options, "Invalid option")
      .required("Please select an option"),
    locationOther: string().when("location", {
      is: "Other",
      then: () => string().required("Please specify the location"),
      otherwise: () => string(),
    }),
    environmentCleanliness: string()
      .oneOf(fields.environmentCleanliness.options, "Invalid option")
      .required("Please select an option"),
    environmentCleanlinessOther: string().when("environmentCleanliness", {
      is: "Other",
      then: () => string().required("Please specify the cleanliness"),
      otherwise: () => string(),
    }),
    patientCleanliness: string()
      .oneOf(fields.patientCleanliness.options, "Invalid option")
      .required("Please select an option"),
    patientCleanlinessOther: string().when("patientCleanliness", {
      is: "Other",
      then: () => string().required("Please specify the cleanliness"),
      otherwise: () => string(),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        store.update((s) => {
          s.restraint = values.restraint;
          s.location = values.location;
          s.locationOther =
            values.location === "Other" ? values.locationOther : "";
          s.environmentCleanliness = values.environmentCleanliness;
          s.environmentCleanlinessOther =
            values.environmentCleanliness === "Other"
              ? values.environmentCleanlinessOther
              : "";
          s.patientCleanliness = values.patientCleanliness;
          s.patientCleanlinessOther =
            values.patientCleanliness === "Other"
              ? values.patientCleanlinessOther
              : "";
        });
        navigation.navigate("InitialConsultationStepSeven");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={6}>
          <GroupCheckBoxField
            label={fields.restraint.label}
            name="restraint"
            options={fields.restraint.options}
          />
          <GroupCheckBoxField
            label={fields.location.label}
            name="location"
            options={fields.location.options}
          />
          {values.location.includes("Other") && (
            <InputField
              label={fields.locationOther.label}
              name="locationOther"
            />
          )}
          <GroupCheckBoxField
            label={fields.environmentCleanliness.label}
            name="environmentCleanliness"
            options={fields.environmentCleanliness.options}
          />
          {values.environmentCleanliness.includes("Other") && (
            <InputField
              label={fields.environmentCleanlinessOther.label}
              name="environmentCleanlinessOther"
            />
          )}
          <GroupCheckBoxField
            label={fields.patientCleanliness.label}
            name="patientCleanliness"
            options={fields.patientCleanliness.options}
          />
          {values.patientCleanliness.includes("Other") && (
            <InputField
              label={fields.patientCleanlinessOther.label}
              name="patientCleanlinessOther"
            />
          )}
        </Layout>
      )}
    </Formik>
  );
};
