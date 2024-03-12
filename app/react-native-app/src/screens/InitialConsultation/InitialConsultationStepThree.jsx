import { Formik } from "formik";
import { number, object, string } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";

export const InitialConsultationStepThree = ({ navigation }) => {
  const keysArr = [
    "localAnaestheticUsed",
    "parietalTunicIncised",
    "portionParietalTunicRemoved",
    "emasculatorsUsed",
    "emasculatorsHeldDurationMinutes",
    "ligaturesUsedToCloseParietalTunic",
    "ligaturesUsedToCloseParietalTunicYesOther",
    "skinClosure",
    "skinClosurePrimaryOrPartial",
  ];
  const fields = initialConsultation.fields;
  const initialValues = useInitialValues(keysArr);

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
        is: "Other",
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
        is: "Other",
        then: () => string().required("Please specify the ligature"),
        otherwise: () => string(),
      }
    ),
    skinClosure: string()
      .oneOf(fields.skinClosure.options, "Invalid option")
      .required("Please select skin closure option"),
    skinClosurePrimaryOrPartial: string().when("skinClosure", {
      is: (val) => val === "Primary closure" || val === "Partial closure",
      then: () => string().required("Please select a suture pattern"),
      otherwise: () => string(),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        store.update((s) => {
          s.localAnaestheticUsed = values.localAnaestheticUsed;
          s.parietalTunicIncised = values.parietalTunicIncised;
          s.portionParietalTunicRemoved = values.portionParietalTunicRemoved;
          s.emasculatorsUsed = values.emasculatorsUsed;
          s.emasculatorsHeldDurationMinutes = values.emasculatorsUsed
            ? values.emasculatorsHeldDurationMinutes
            : 0;
          s.ligaturesUsedToCloseParietalTunic =
            values.ligaturesUsedToCloseParietalTunic;
          s.ligaturesUsedToCloseParietalTunicYes =
            values.ligaturesUsedToCloseParietalTunic
              ? values.ligaturesUsedToCloseParietalTunicYes
              : "";
          s.ligaturesUsedToCloseParietalTunicYesOther =
            values.ligaturesUsedToCloseParietalTunicYes === "Other"
              ? values.ligaturesUsedToCloseParietalTunicYesOther
              : "";
          s.ligaturesPlacedAroundVasculatureOnly =
            values.ligaturesPlacedAroundVasculatureOnly;
          s.ligaturesPlacedAroundVasculatureOnlyYes =
            values.ligaturesPlacedAroundVasculatureOnly
              ? values.ligaturesPlacedAroundVasculatureOnlyYes
              : "";
          s.ligaturesPlacedAroundVasculatureOnlyYesOther =
            values.ligaturesPlacedAroundVasculatureOnlyYes === "Other"
              ? values.ligaturesPlacedAroundVasculatureOnlyYesOther
              : "";
          s.skinClosure = values.skinClosure;
          s.skinClosurePrimaryOrPartial =
            values.skinClosure === "Primary closure" ||
            values.skinClosure === "Partial closure"
              ? values.skinClosurePrimaryOrPartial
              : "";
        });
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
          {values?.ligaturesUsedToCloseParietalTunicYes === "Other" && (
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
          {values?.ligaturesPlacedAroundVasculatureOnlyYes === "Other" && (
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
          {values?.skinClosure === "Primary closure" ||
            (values?.skinClosure === "Partial closure" && (
              <GroupCheckBoxField
                label={fields.skinClosurePrimaryOrPartial.label}
                name="skinClosurePrimaryOrPartial"
                options={fields.skinClosurePrimaryOrPartial.options}
              />
            ))}
        </Layout>
      )}
    </Formik>
  );
};
