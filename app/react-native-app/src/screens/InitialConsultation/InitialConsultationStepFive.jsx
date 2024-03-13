import { Formik } from "formik";
import { array, number, object, string } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";

export const InitialConsultationStepFive = ({ navigation }) => {
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
  const initialValues = useInitialValues(keysArr);

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
        is: (val) => val.includes("Other"),
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
        is: (val) => val.includes("Other"),
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        store.update((s) => {
          s.postoperativeAnalgesiaGiven = values.postoperativeAnalgesiaGiven;
          s.postoperativeAnalgesiaGivenYes = values.postoperativeAnalgesiaGiven
            ? values.postoperativeAnalgesiaGivenYes
            : [];
          s.postoperativeAnalgesiaGivenYesOther =
            values.postoperativeAnalgesiaGivenYes.includes("Other")
              ? values.postoperativeAnalgesiaGivenYesOther
              : "";
          s.postoperativeAnalgesiaGivenDays = values.postoperativeAnalgesiaGiven
            ? values.postoperativeAnalgesiaGivenDays
            : 0;
          s.postoperativeAntimicrobialsGiven =
            values.postoperativeAntimicrobialsGiven;
          s.postoperativeAntimicrobialsGivenYes =
            values.postoperativeAntimicrobialsGiven
              ? values.postoperativeAntimicrobialsGivenYes
              : [];
          s.postoperativeAntimicrobialsGivenYesOther =
            values.postoperativeAntimicrobialsGivenYes.includes("Other")
              ? values.postoperativeAntimicrobialsGivenYesOther
              : "";
          s.postoperativeAntimicrobialsGivenDays =
            values.postoperativeAntimicrobialsGiven
              ? values.postoperativeAntimicrobialsGivenDays
              : 0;
        });
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
          {values.postoperativeAnalgesiaGivenYes.includes("Other") && (
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
          {values.postoperativeAntimicrobialsGivenYes.includes("Other") && (
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
