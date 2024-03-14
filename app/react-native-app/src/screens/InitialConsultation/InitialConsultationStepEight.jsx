import { Formik } from "formik";
import { InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { DatePickerField } from "components/DatePickerField";
import { ToggleField } from "components/forms";
import { mapValuesToStore } from "store/storeMapper";

const keysArr = ["dischargeDate", "dischargeNote", "horse.deceased"];

const fields = initialConsultation.fields;

export const InitialConsultationStepEight = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);

  return (
    <Formik
      initialValues={initialValues}
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
