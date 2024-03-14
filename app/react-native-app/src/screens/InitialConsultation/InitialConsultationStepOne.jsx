import { useEffect } from "react";
import { Formik } from "formik";
import { object, string, number } from "yup";
import { DatePickerField } from "components/DatePickerField";
import { InputField } from "components/forms";
import { validationSchema as emailSchema } from "components/EmailField";
import { initialConsultation } from "constants/initial-consultation";
import {
  initialConsultationStore as store,
  updateInitialConsultationStore,
} from "store/InitialConsultationStore";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { mapValuesToStore } from "store/storeMapper";

const keysArr = [
  "horse.name",
  "clientEmail",
  "horse.dateOfCastration",
  "horse.age",
];

const fields = initialConsultation.fields;

const validationSchema = object().shape({
  horse: object().shape({
    name: string().required("Horse name required"),
    dateOfCastration: string().required("Date of castration required"),
    age: number()
      .min(1, "Must be at least 1")
      .positive("Age must be a positive number")
      .typeError("Weight must be a number")
      .required("Age of horse required"),
  }),
  ...emailSchema("clientEmail"),
});

export const InitialConsultationStepOne = ({ navigation, route }) => {
  const { editData } = route.params;

  const initialValues = useInitialValues(keysArr);

  useEffect(() => {
    editData && updateInitialConsultationStore(editData);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // add values to global store
        // each step/stage submission acts as temp submission
        // only after the confirmation screen, data is finally added to the db
        // this allow user to navigate back and forth between the screens/forms
        store.update((s) => mapValuesToStore(values, s));
        navigation.navigate("InitialConsultationStepTwo");
      }}
    >
      {({ handleSubmit }) => (
        <Layout onSubmit={() => handleSubmit()} current={1}>
          <InputField label={fields.horse.name.label} name="horse.name" />
          <InputField label={fields.clientEmail.label} name="clientEmail" />
          <DatePickerField
            name="horse.dateOfCastration"
            label={fields.horse.dateOfCastration.label}
            type="date"
          />
          <InputField
            label={fields.horse.age.label}
            name="horse.age"
            keyboardType="numeric"
          />
        </Layout>
      )}
    </Formik>
  );
};
