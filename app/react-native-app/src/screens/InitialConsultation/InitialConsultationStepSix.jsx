import { Formik } from "formik";
import { object, string } from "yup";
import { GroupCheckBoxField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { mapValuesToStore } from "store/storeMapper";

const OTHER = "Other";

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

const validationSchema = object().shape({
  restraint: string()
    .oneOf(fields.restraint.options, "Invalid option")
    .required("Please select an option"),
  location: string()
    .oneOf(fields.location.options, "Invalid option")
    .required("Please select an option"),
  locationOther: string().when("location", {
    is: OTHER,
    then: () => string().required("Please specify the location"),
    otherwise: () => string(),
  }),
  environmentCleanliness: string()
    .oneOf(fields.environmentCleanliness.options, "Invalid option")
    .required("Please select an option"),
  environmentCleanlinessOther: string().when("environmentCleanliness", {
    is: OTHER,
    then: () => string().required("Please specify the cleanliness"),
    otherwise: () => string(),
  }),
  patientCleanliness: string()
    .oneOf(fields.patientCleanliness.options, "Invalid option")
    .required("Please select an option"),
  patientCleanlinessOther: string().when("patientCleanliness", {
    is: OTHER,
    then: () => string().required("Please specify the cleanliness"),
    otherwise: () => string(),
  }),
});

export const InitialConsultationStepSix = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let vals = { ...values };

        vals.location !== OTHER && (vals.locationOther = "");
        vals.environmentCleanliness !== OTHER &&
          (vals.environmentCleanlinessOther = "");
        vals.patientCleanliness !== OTHER &&
          (vals.patientCleanlinessOther = "");

        store.update((s) => mapValuesToStore(vals, s));
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
          {values.location.includes(OTHER) && (
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
          {values.environmentCleanliness.includes(OTHER) && (
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
          {values.patientCleanliness.includes(OTHER) && (
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
