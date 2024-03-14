import { Formik } from "formik";
import { number, object, string } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";
import { mapValuesToStore } from "store/storeMapper";

const OTHER = "Other";
const PRIMARY_CLOSURE = "Primary closure";
const PARTIAL_CLOSURE = "Partial closure";

const keysArr = [
  "localAnaestheticUsed",
  "parietalTunicIncised",
  "portionParietalTunicRemoved",
  "emasculatorsUsed",
  "emasculatorsHeldDurationMinutes",
  "ligaturesUsedToCloseParietalTunic",
  "ligaturesUsedToCloseParietalTunicYes",
  "ligaturesUsedToCloseParietalTunicYesOther",
  "ligaturesPlacedAroundVasculatureOnly",
  "ligaturesPlacedAroundVasculatureOnlyYes",
  "ligaturesPlacedAroundVasculatureOnlyYesOther",
  "skinClosure",
  "skinClosurePrimaryOrPartial",
];

const fields = initialConsultation.fields;

const validationSchema = object().shape({
  emasculatorsHeldDurationMinutes: number().when("emasculatorsUsed", {
    is: true,
    then: () =>
      number()
        .min(1, "Duration must be greater than 0")
        .positive("Duration must be a positive number")
        .typeError("Duration must be a number")
        .required("Duration is required"),
    otherwise: () => number(),
  }),
  ligaturesUsedToCloseParietalTunicYes: string().when(
    "ligaturesUsedToCloseParietalTunic",
    {
      is: true,
      then: () =>
        string()
          .oneOf(
            fields.ligaturesUsedToCloseParietalTunicYes.options,
            "Invalid option"
          )
          .required("Please select an option"),
      otherwise: () => string(),
    }
  ),
  ligaturesUsedToCloseParietalTunicYesOther: string().when(
    "ligaturesUsedToCloseParietalTunicYes",
    {
      is: OTHER,
      then: () => string().required("Please specify the ligature"),
      otherwise: () => string(),
    }
  ),
  ligaturesPlacedAroundVasculatureOnlyYes: string().when(
    "ligaturesPlacedAroundVasculatureOnly",
    {
      is: true,
      then: () =>
        string()
          .oneOf(
            fields.ligaturesPlacedAroundVasculatureOnlyYes.options,
            "Invalid option"
          )
          .required("Please select an option"),
      otherwise: () => string(),
    }
  ),
  ligaturesPlacedAroundVasculatureOnlyYesOther: string().when(
    "ligaturesPlacedAroundVasculatureOnlyYes",
    {
      is: OTHER,
      then: () => string().required("Please specify the ligature"),
      otherwise: () => string(),
    }
  ),
  skinClosure: string()
    .oneOf(fields.skinClosure.options, "Invalid option")
    .required("Please select skin closure option"),
  skinClosurePrimaryOrPartial: string().when("skinClosure", {
    is: (val) => val === PRIMARY_CLOSURE || val === PARTIAL_CLOSURE,
    then: () => string().required("Please select a suture pattern"),
    otherwise: () => string(),
  }),
});

export const InitialConsultationStepThree = ({ navigation }) => {
  const initialValues = useInitialValues(keysArr);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        let vals = { ...values };

        !vals.emasculatorsUsed && (vals.emasculatorsHeldDurationMinutes = 0);
        !vals.ligaturesUsedToCloseParietalTunic &&
          (vals.ligaturesUsedToCloseParietalTunicYes = "");
        vals.ligaturesUsedToCloseParietalTunicYes !== OTHER &&
          (vals.ligaturesUsedToCloseParietalTunicYesOther = "");
        !vals.ligaturesPlacedAroundVasculatureOnly &&
          (vals.ligaturesPlacedAroundVasculatureOnlyYes = "");
        vals.ligaturesPlacedAroundVasculatureOnlyYes !== OTHER &&
          (vals.ligaturesPlacedAroundVasculatureOnlyYesOther = "");
        vals.skinClosure !== PRIMARY_CLOSURE &&
          vals.skinClosure !== PARTIAL_CLOSURE &&
          (vals.skinClosurePrimaryOrPartial = "");

        store.update((s) => mapValuesToStore(vals, s));
        navigation.navigate("InitialConsultationStepFour");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={3}>
          <ToggleField
            name="localAnaestheticUsed"
            label={fields.localAnaestheticUsed.label}
          />
          <ToggleField
            name="parietalTunicIncised"
            label={fields.parietalTunicIncised.label}
          />
          <ToggleField
            name="portionParietalTunicRemoved"
            label={fields.portionParietalTunicRemoved.label}
          />
          <ToggleField
            name="emasculatorsUsed"
            label={fields.emasculatorsUsed.label}
          />
          {values?.emasculatorsUsed && (
            <InputField
              label={fields.emasculatorsHeldDurationMinutes.label}
              name="emasculatorsHeldDurationMinutes"
              keyboardType="numeric"
            />
          )}
          <ToggleField
            name="ligaturesUsedToCloseParietalTunic"
            label={fields.ligaturesUsedToCloseParietalTunic.label}
          />
          {values?.ligaturesUsedToCloseParietalTunic && (
            <GroupCheckBoxField
              label={fields.ligaturesUsedToCloseParietalTunicYes.label}
              name="ligaturesUsedToCloseParietalTunicYes"
              options={fields.ligaturesUsedToCloseParietalTunicYes.options}
            />
          )}
          {values?.ligaturesUsedToCloseParietalTunicYes === OTHER && (
            <InputField
              label={fields.ligaturesUsedToCloseParietalTunicYesOther.label}
              name="ligaturesUsedToCloseParietalTunicYesOther"
            />
          )}
          <ToggleField
            name="ligaturesPlacedAroundVasculatureOnly"
            label={fields.ligaturesPlacedAroundVasculatureOnly.label}
          />
          {values?.ligaturesPlacedAroundVasculatureOnly && (
            <GroupCheckBoxField
              label={fields.ligaturesPlacedAroundVasculatureOnlyYes.label}
              name="ligaturesPlacedAroundVasculatureOnlyYes"
              options={fields.ligaturesPlacedAroundVasculatureOnlyYes.options}
            />
          )}
          {values?.ligaturesPlacedAroundVasculatureOnlyYes === OTHER && (
            <InputField
              label={fields.ligaturesPlacedAroundVasculatureOnlyYesOther.label}
              name="ligaturesPlacedAroundVasculatureOnlyYesOther"
            />
          )}
          <GroupCheckBoxField
            label={fields.skinClosure.label}
            name="skinClosure"
            options={fields.skinClosure.options}
          />
          {(values?.skinClosure === PRIMARY_CLOSURE ||
            values?.skinClosure === PARTIAL_CLOSURE) && (
            <GroupCheckBoxField
              label={fields.skinClosurePrimaryOrPartial.label}
              name="skinClosurePrimaryOrPartial"
              options={fields.skinClosurePrimaryOrPartial.options}
            />
          )}
        </Layout>
      )}
    </Formik>
  );
};
