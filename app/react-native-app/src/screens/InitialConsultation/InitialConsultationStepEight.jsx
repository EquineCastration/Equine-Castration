import { Formik } from "formik";
import { object, string } from "yup";
import { InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { DatePickerField } from "components/DatePickerField";
import { ToggleField } from "components/forms";

export const InitialConsultationStepEight = ({ navigation }) => {
  const keysArr = ["dischargeDate", "dischargeNote", "horse.deceased"];
  const fields = initialConsultation.fields;
  const initialValues = useInitialValues(keysArr);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        store.update((s) => {
          s.dischargeDate = values.dischargeDate;
          s.dischargeNote = values.dischargeNote;
          s.horse.deceased = values.horse.deceased;
        });
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
