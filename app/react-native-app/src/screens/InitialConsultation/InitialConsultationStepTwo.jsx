import { Formik } from "formik";
import { object, string, number } from "yup";
import { GroupCheckBoxField, ToggleField, InputField } from "components/forms";
import { initialConsultationStore as store } from "store/InitialConsultationStore";
import { initialConsultation } from "constants/initial-consultation";
import { useInitialValues } from "./useInitialValues";
import { Layout } from "./Layout";

export const InitialConsultationStepTwo = ({ navigation }) => {
  const keysArr = [
    "horse.weight",
    "horse.breed",
    "horse.breedOther",
    "horse.isClinicallyHealthy",
    "horse.isClinicallyHealthyNo",
    "horse.isOnMedication",
    "horse.isOnMedicationYes",
    "horse.locationTesticleLeft",
    "horse.locationTesticleRight",
  ];
  const fields = initialConsultation.fields;
  const initialValues = useInitialValues(keysArr);

  const validationSchema = object().shape({
    horse: object().shape({
      weight: number()
        .min(1, "Weight must be greater than 0")
        .positive("Weight must be a positive number")
        .typeError("Weight must be a number")
        .required("Weight is required"),
      breed: string()
        .oneOf(fields.horse.breed.options, "Invalid breed")
        .required("Breed is required"),
      breedOther: string().when("breed", {
        is: "Other",
        then: () => string().required("Please specify the breed"),
        otherwise: () => string(),
      }),
      isClinicallyHealthyNo: string().when("isClinicallyHealthy", {
        is: false,
        then: () => string().required("Please describe the abnormal findings"),
        otherwise: () => string(),
      }),
      isOnMedicationYes: string().when("isOnMedication", {
        is: true,
        then: () => string().required("Please note the medication"),
        otherwise: () => string(),
      }),
      locationTesticleLeft: string()
        .oneOf(fields.horse.locationTesticleLeft.options, "Invalid location")
        .required("Location is required"),
      locationTesticleRight: string()
        .oneOf(fields.horse.locationTesticleRight.options, "Invalid location")
        .required("Location is required"),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        store.update((s) => {
          s.horse.weight = values.horse.weight;
          s.horse.breed = values.horse.breed;
          s.horse.breedOther =
            values.horse.breed === "Other" ? values.horse.breedOther : "";
          s.horse.isClinicallyHealthy = values.horse.isClinicallyHealthy;
          s.horse.isClinicallyHealthyNo = values.horse.isClinicallyHealthy
            ? ""
            : values.horse.isClinicallyHealthyNo;
          s.horse.isOnMedication = values.horse.isOnMedication;
          s.horse.isOnMedicationYes = values.horse.isOnMedication
            ? values.horse.isOnMedicationYes
            : "";
          s.horse.locationTesticleLeft = values.horse.locationTesticleLeft;
          s.horse.locationTesticleRight = values.horse.locationTesticleRight;
        });
        navigation.navigate("InitialConsultationStepThree");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={2}>
          <InputField
            label={fields.horse.weight.label}
            name="horse.weight"
            keyboardType="numeric"
          />
          <GroupCheckBoxField
            label={fields.horse.breed.label}
            name="horse.breed"
            options={fields.horse.breed.options}
          />
          {values?.horse?.breed === "Other" && (
            <InputField
              label={fields.horse.breedOther.label}
              name="horse.breedOther"
            />
          )}
          <ToggleField
            name="horse.isClinicallyHealthy"
            label={fields.horse.isClinicallyHealthy.label}
          />
          {!values?.horse?.isClinicallyHealthy && (
            <InputField
              label={fields.horse.isClinicallyHealthyNo.label}
              name="horse.isClinicallyHealthyNo"
              multiline
              numberOfLines={4}
            />
          )}
          <ToggleField
            name="horse.isOnMedication"
            label={fields.horse.isOnMedication.label}
          />
          {values?.horse?.isOnMedication && (
            <InputField
              label={fields.horse.isOnMedicationYes.label}
              name="horse.isOnMedicationYes"
              multiline
              numberOfLines={4}
            />
          )}
          <GroupCheckBoxField
            label={fields.horse.locationTesticleLeft.label}
            name="horse.locationTesticleLeft"
            options={fields.horse.locationTesticleLeft.options}
          />
          <GroupCheckBoxField
            label={fields.horse.locationTesticleRight.label}
            name="horse.locationTesticleRight"
            options={fields.horse.locationTesticleRight.options}
          />
        </Layout>
      )}
    </Formik>
  );
};
