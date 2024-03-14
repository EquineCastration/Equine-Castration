import { Formik } from "formik";
import { array, object, string } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { mapValuesToStore } from "store/storeMapper";

const OTHER = "Other";

const keysArr = [
  "anyIntraoperativeComplications",
  "anyIntraoperativeComplicationsYes",
  "anyPostoperativeComplications",
  "anyPostoperativeComplicationsYes",
  "anyPostoperativeComplicationsYesOther",
];

const fields = initialConsultation.fields;

const validationSchema = object().shape({
  anyIntraoperativeComplicationsYes: string().when(
    "anyIntraoperativeComplications",
    {
      is: true,
      then: () => string().required("Please describe the complications"),
      otherwise: () => string(),
    }
  ),
  anyPostoperativeComplicationsYes: array()
    .of(string())
    .when("anyPostoperativeComplications", {
      is: true,
      then: () =>
        array()
          .of(
            string().oneOf(
              fields.anyPostoperativeComplicationsYes.options,
              "Invalid option"
            )
          )
          .min(1, "Please select at least one option")
          .required("Required"),
      otherwise: () => array().of(string()),
    }),
  anyPostoperativeComplicationsYesOther: string().when(
    "anyPostoperativeComplicationsYes",
    {
      is: (val) => val.includes(OTHER),
      then: () => string().required("Please specify the complication"),
      otherwise: () => string(),
    }
  ),
});

export const InitialConsultationStepSeven = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let vals = { ...values };

        !vals.anyIntraoperativeComplications &&
          (vals.anyIntraoperativeComplicationsYes = "");
        !vals.anyPostoperativeComplications &&
          (vals.anyPostoperativeComplicationsYes = []);
        !vals.anyPostoperativeComplicationsYes.includes(OTHER) &&
          (vals.anyPostoperativeComplicationsYesOther = "");

        store.update((s) => mapValuesToStore(vals, s));
        navigation.navigate("InitialConsultationEight");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={7}>
          <ToggleField
            name="anyIntraoperativeComplications"
            label={fields.anyIntraoperativeComplications.label}
          />
          {values.anyIntraoperativeComplications && (
            <InputField
              name="anyIntraoperativeComplicationsYes"
              label={fields.anyIntraoperativeComplicationsYes.label}
              multiline
              numberOfLines={4}
            />
          )}
          <ToggleField
            name="anyPostoperativeComplications"
            label={fields.anyPostoperativeComplications.label}
          />
          {values.anyPostoperativeComplications && (
            <GroupCheckBoxField
              name="anyPostoperativeComplicationsYes"
              label={fields.anyPostoperativeComplicationsYes.label}
              options={fields.anyPostoperativeComplicationsYes.options}
              multiSelect
            />
          )}
          {values.anyPostoperativeComplicationsYes.includes(OTHER) && (
            <InputField
              name="anyPostoperativeComplicationsYesOther"
              label={fields.anyPostoperativeComplicationsYesOther.label}
              multiline
              numberOfLines={4}
            />
          )}
        </Layout>
      )}
    </Formik>
  );
};
