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
  "postoperativeAnalgesiaGiven",
  "postoperativeAnalgesiaGivenYes",
  "postoperativeAnalgesiaGivenYesOther",
  "postoperativeAnalgesiaGivenDays",
  "postoperativeAntimicrobialsGiven",
  "postoperativeAntimicrobialsGivenYes",
  "postoperativeAntimicrobialsGivenYesOther",
  "postoperativeAntimicrobialsGivenDays",
];

const fields = initialConsultation.fields;

const validationSchema = object().shape({
  postoperativeAnalgesiaGivenYes: array()
    .of(
      string().oneOf(
        fields.postoperativeAnalgesiaGivenYes.options,
        "Invalid option"
      )
    )
    .when("postoperativeAnalgesiaGiven", {
      is: true,
      then: () =>
        array()
          .of(
            string().oneOf(
              fields.postoperativeAnalgesiaGivenYes.options,
              "Invalid option"
            )
          )
          .min(1, "Please select at least one option")
          .required("Required"),
      otherwise: () => array().of(string()),
    }),
  postoperativeAnalgesiaGivenYesOther: string().when(
    "postoperativeAnalgesiaGivenYes",
    {
      is: (val) => val.includes(OTHER),
      then: () => string().required("Please specify the analgesia"),
      otherwise: () => string(),
    }
  ),
  postoperativeAnalgesiaGivenDays: number().when(
    "postoperativeAnalgesiaGiven",
    {
      is: true,
      then: () =>
        number()
          .min(1, "Days must be greater than 0")
          .positive("Days must be a positive number")
          .typeError("Days must be a number")
          .required("Days is required"),
      otherwise: () => number(),
    }
  ),
  postoperativeAntimicrobialsGivenYes: array()
    .of(
      string().oneOf(
        fields.postoperativeAntimicrobialsGivenYes.options,
        "Invalid option"
      )
    )
    .when("postoperativeAntimicrobialsGiven", {
      is: true,
      then: () =>
        array()
          .of(
            string().oneOf(
              fields.postoperativeAntimicrobialsGivenYes.options,
              "Invalid option"
            )
          )
          .min(1, "Please select at least one option")
          .required("Required"),
      otherwise: () => array().of(string()),
    }),
  postoperativeAntimicrobialsGivenYesOther: string().when(
    "postoperativeAntimicrobialsGivenYes",
    {
      is: (val) => val.includes(OTHER),
      then: () => string().required("Please specify the antimicrobial"),
      otherwise: () => string(),
    }
  ),
  postoperativeAntimicrobialsGivenDays: number().when(
    "postoperativeAntimicrobialsGiven",
    {
      is: true,
      then: () =>
        number()
          .min(1, "Days must be greater than 0")
          .positive("Days must be a positive number")
          .typeError("Days must be a number")
          .required("Days is required"),
      otherwise: () => number(),
    }
  ),
});

export const InitialConsultationStepFive = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let vals = { ...values };

        !vals.postoperativeAnalgesiaGiven &&
          (vals.postoperativeAnalgesiaGivenYes = []);
        !vals.postoperativeAnalgesiaGivenYes.includes(OTHER) &&
          (vals.postoperativeAnalgesiaGivenYesOther = "");
        !vals.postoperativeAnalgesiaGiven &&
          (vals.postoperativeAnalgesiaGivenDays = 0);
        !vals.postoperativeAntimicrobialsGiven &&
          (vals.postoperativeAntimicrobialsGivenYes = []);
        !vals.postoperativeAntimicrobialsGivenYes.includes(OTHER) &&
          (vals.postoperativeAntimicrobialsGivenYesOther = "");
        !vals.postoperativeAntimicrobialsGiven &&
          (vals.postoperativeAntimicrobialsGivenDays = 0);

        store.update((s) => mapValuesToStore(vals, s));
        navigation.navigate("InitialConsultationStepSix");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={5}>
          <ToggleField
            name="postoperativeAnalgesiaGiven"
            label={fields.postoperativeAnalgesiaGiven.label}
          />
          {values.postoperativeAnalgesiaGiven && (
            <GroupCheckBoxField
              name="postoperativeAnalgesiaGivenYes"
              label={fields.postoperativeAnalgesiaGivenYes.label}
              options={fields.postoperativeAnalgesiaGivenYes.options}
              multiSelect
            />
          )}
          {values.postoperativeAnalgesiaGivenYes.includes(OTHER) && (
            <InputField
              name="postoperativeAnalgesiaGivenYesOther"
              label={fields.postoperativeAnalgesiaGivenYesOther.label}
            />
          )}
          {values.postoperativeAnalgesiaGiven && (
            <InputField
              name="postoperativeAnalgesiaGivenDays"
              label={fields.postoperativeAnalgesiaGivenDays.label}
              keyboardType="numeric"
            />
          )}
          <ToggleField
            name="postoperativeAntimicrobialsGiven"
            label={fields.postoperativeAntimicrobialsGiven.label}
          />
          {values.postoperativeAntimicrobialsGiven && (
            <GroupCheckBoxField
              name="postoperativeAntimicrobialsGivenYes"
              label={fields.postoperativeAntimicrobialsGivenYes.label}
              options={fields.postoperativeAntimicrobialsGivenYes.options}
              multiSelect
            />
          )}
          {values.postoperativeAntimicrobialsGivenYes.includes(OTHER) && (
            <InputField
              name="postoperativeAntimicrobialsGivenYesOther"
              label={fields.postoperativeAntimicrobialsGivenYesOther.label}
            />
          )}
          {values.postoperativeAntimicrobialsGiven && (
            <InputField
              name="postoperativeAntimicrobialsGivenDays"
              label={fields.postoperativeAntimicrobialsGivenDays.label}
              keyboardType="numeric"
            />
          )}
        </Layout>
      )}
    </Formik>
  );
};
