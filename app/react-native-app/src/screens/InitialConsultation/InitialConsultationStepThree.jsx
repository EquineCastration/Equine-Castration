import { View } from "react-native";

import { Formik } from "formik";
import { object, string, number } from "yup";

import { InitialConsultationStore } from "store/store";
import { InitialValues, Layout } from "./InitialConsultationStepOne";
import { initialConsultation } from "constants/initial-consultation";
import { BasicGroupOptionsField } from "components/BasicGroupOptionsField";

export const InitialConsultationStepThree = ({ navigation }) => {
  const keysArr = [
    "locationTesticleLeft",
    "locationTesticleRight",
    "ligatureUsed",
  ];
  const fields = initialConsultation.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const validationSchema = object().shape({
    locationTesticleLeft: string()
      .oneOf(fields.locationTesticleLeft.options, "Invalid")
      .required("Required"),
    locationTesticleRight: string()
      .oneOf(fields.locationTesticleRight.options, "Invalid")
      .required("Required"),
    ligatureUsed: string()
      .oneOf(fields.ligatureUsed.options, "Invalid")
      .required("Ligature used is required"),
  });

  return (
    <Formik
      initialValues={{ ...initialValues, otherTechnique: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        InitialConsultationStore.update((s) => {
          s.locationTesticleLeft = values.locationTesticleLeft;
          s.locationTesticleRight = values.locationTesticleRight;
          s.ligatureUsed = values.ligatureUsed;
        });
        navigation.navigate("InitialConsultationStepFour");
      }}
    >
      {({ handleSubmit }) => (
        <Layout onSubmit={() => handleSubmit()} current={3}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicGroupOptionsField
                label={fields.locationTesticleLeft.label}
                name="locationTesticleLeft"
                options={fields.locationTesticleLeft.options}
              />

              <BasicGroupOptionsField
                label={fields.locationTesticleRight.label}
                name="locationTesticleRight"
                options={fields.locationTesticleRight.options}
              />

              <BasicGroupOptionsField
                label={fields.ligatureUsed.label}
                name="ligatureUsed"
                options={fields.ligatureUsed.options}
              />
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
