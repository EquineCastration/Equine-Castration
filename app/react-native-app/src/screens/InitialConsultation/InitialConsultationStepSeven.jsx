import { Formik } from "formik";
import { array, object, string } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";

export const InitialConsultationStepSeven = ({ navigation }) => {
  const keysArr = [
    "anyIntraoperativeComplications",
    "anyIntraoperativeComplicationsYes",
    "anyPostoperativeComplications",
    "anyPostoperativeComplicationsYes",
    "anyPostoperativeComplicationsYesOther",
  ];
  const fields = initialConsultation.fields;
  const initialValues = useInitialValues(keysArr);

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
        is: (val) => val.includes("Other"),
        then: () => string().required("Please specify the complication"),
        otherwise: () => string(),
      }
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        store.update((s) => {
          s.anyIntraoperativeComplications =
            values.anyIntraoperativeComplications;
          s.anyIntraoperativeComplicationsYes =
            values.anyIntraoperativeComplications
              ? values.anyIntraoperativeComplicationsYes
              : "";
          s.anyPostoperativeComplications =
            values.anyPostoperativeComplications;
          s.anyPostoperativeComplicationsYes =
            values.anyPostoperativeComplications
              ? values.anyPostoperativeComplicationsYes
              : [];
          s.anyPostoperativeComplicationsYesOther =
            values.anyPostoperativeComplicationsYes.includes("Other")
              ? values.anyPostoperativeComplicationsYesOther
              : "";
        });
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
          {values.anyPostoperativeComplicationsYes.includes("Other") && (
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
