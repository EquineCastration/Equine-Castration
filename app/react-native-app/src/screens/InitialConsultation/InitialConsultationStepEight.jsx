import { Formik } from "formik";
import { InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { Layout } from "./Layout";
import { useInitialValues } from "./useInitialValues";
import { object, string } from "yup";
import { DatePickerField } from "components/forms";
import { ToggleField } from "components/forms";
import { mapValuesToStore } from "store/storeMapper";

const keysArr = ["dischargeDate", "dischargeNote", "horse.deceased"];

const fields = initialConsultation.fields;

const validationSchema = object().shape({
  dischargeDate: string().required("Date of discharge date"),
});

export const InitialConsultationStepEight = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        store.update((s) => mapValuesToStore(values, s));
        navigation.navigate("InitialConsultationConfirmation");
      }}
    >
      {({ handleSubmit }) => (
        <Layout onSubmit={() => handleSubmit()} current={8}>
          <ToggleField
            label={fields.horse.deceased.label}
            name="horse.deceased"
          />
          <DatePickerField
            label={fields.dischargeDate.label}
            name="dischargeDate"
            type="date"
          />
          <InputField
            label={fields.dischargeNote.label}
            name="dischargeNote"
            multiline
            numberOfLines={4}
          />
        </Layout>
      )}
    </Formik>
  );
};
