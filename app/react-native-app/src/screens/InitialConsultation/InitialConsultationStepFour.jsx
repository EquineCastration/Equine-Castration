import { Formik } from "formik";
import { array, number, object, string } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { mapValuesToStore } from "store/storeMapper";

const OTHER = "Other";

const keysArr = [
  "preoperativeAnalgesiaGiven",
  "preoperativeAnalgesiaGivenYes",
  "preoperativeAnalgesiaGivenYesOther",
  "preoperativeAntimicrobialsGiven",
  "preoperativeAntimicrobialsGivenYes",
  "preoperativeAntimicrobialsGivenYesOther",
  "antimicrobialAdminTiming",
];

const fields = initialConsultation.fields;

const validationSchema = object().shape({
  preoperativeAnalgesiaGivenYes: array()
    .of(
      string().oneOf(
        fields.preoperativeAnalgesiaGivenYes.options,
        "Invalid option"
      )
    )
    .when("preoperativeAnalgesiaGiven", {
      is: true,
      then: () =>
        array()
          .of(
            string().oneOf(
              fields.preoperativeAnalgesiaGivenYes.options,
              "Invalid option"
            )
          )
          .min(1, "Please select at least one option")
          .required("Required"),
      otherwise: () => array().of(string()),
    }),
  preoperativeAnalgesiaGivenYesOther: string().when(
    "preoperativeAnalgesiaGivenYes",
    {
      is: (val) => val.includes(OTHER),
      then: () => string().required("Please specify the analgesia"),
      otherwise: () => string(),
    }
  ),
  preoperativeAntimicrobialsGivenYes: array()
    .of(
      string().oneOf(
        fields.preoperativeAntimicrobialsGivenYes.options,
        "Invalid option"
      )
    )
    .when("preoperativeAntimicrobialsGiven", {
      is: true,
      then: () =>
        array()
          .of(
            string().oneOf(
              fields.preoperativeAntimicrobialsGivenYes.options,
              "Invalid option"
            )
          )
          .min(1, "Please select at least one option")
          .required("Required"),
      otherwise: () => array().of(string()),
    }),
  preoperativeAntimicrobialsGivenYesOther: string().when(
    "preoperativeAntimicrobialsGivenYes",
    {
      is: (val) => val.includes(OTHER),
      then: () => string().required("Please specify the antimicrobial"),
      otherwise: () => string(),
    }
  ),
  antimicrobialAdminTiming: number()
    .min(1, "Timing must be greater than 0")
    .positive("Timing must be a positive number")
    .typeError("Timing must be a number")
    .required("Timing is required"),
});

export const InitialConsultationStepFour = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let vals = { ...values };

        !vals.preoperativeAnalgesiaGiven &&
          (vals.preoperativeAnalgesiaGivenYes = []);
        !vals.preoperativeAnalgesiaGivenYes.includes(OTHER) &&
          (vals.preoperativeAnalgesiaGivenYesOther = "");
        !vals.preoperativeAntimicrobialsGiven &&
          (vals.preoperativeAntimicrobialsGivenYes = []);
        !vals.preoperativeAntimicrobialsGivenYes.includes(OTHER) &&
          (vals.preoperativeAntimicrobialsGivenYesOther = "");

        store.update((s) => mapValuesToStore(vals, s));
        navigation.navigate("InitialConsultationStepFive");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={4}>
          <ToggleField
            label={fields.preoperativeAnalgesiaGiven.label}
            name="preoperativeAnalgesiaGiven"
          />
          {values.preoperativeAnalgesiaGiven && (
            <GroupCheckBoxField
              label={fields.preoperativeAnalgesiaGivenYes.label}
              name="preoperativeAnalgesiaGivenYes"
              options={fields.preoperativeAnalgesiaGivenYes.options}
              multiSelect
            />
          )}
          {values.preoperativeAnalgesiaGivenYes.includes(OTHER) && (
            <InputField
              label={fields.preoperativeAnalgesiaGivenYesOther.label}
              name="preoperativeAnalgesiaGivenYesOther"
            />
          )}
          <ToggleField
            label={fields.preoperativeAntimicrobialsGiven.label}
            name="preoperativeAntimicrobialsGiven"
          />
          {values.preoperativeAntimicrobialsGiven && (
            <GroupCheckBoxField
              label={fields.preoperativeAntimicrobialsGivenYes.label}
              name="preoperativeAntimicrobialsGivenYes"
              options={fields.preoperativeAntimicrobialsGivenYes.options}
              multiSelect
            />
          )}
          {values.preoperativeAntimicrobialsGivenYes.includes(OTHER) && (
            <InputField
              label={fields.preoperativeAntimicrobialsGivenYesOther.label}
              name="preoperativeAntimicrobialsGivenYesOther"
            />
          )}
          <InputField
            label={fields.antimicrobialAdminTiming.label}
            name="antimicrobialAdminTiming"
            keyboardType="numeric"
          />
        </Layout>
      )}
    </Formik>
  );
};
