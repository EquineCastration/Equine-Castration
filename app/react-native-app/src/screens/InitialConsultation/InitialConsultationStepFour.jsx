import { View } from "react-native";
import { Formik } from "formik";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";
import { FixedStepButton } from "./InitialConsultationStepOne";
import { Layout, InitialValues } from "./InitialConsultationStepOne";
import { BasicGroupOptions } from "components/BasicGroupOptions";

export const InitialConsultationStepFour = ({ navigation }) => {
  const keysArr = [
    "locationTesticleLeft",
    "locationTesticleRight",
    "ligatureUsed",
  ];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    fields,
    InitialConsultationStore.useState()
  );

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.locationTesticleLeft = values.locationTesticleLeft;
            s.locationTesticleRight = values.locationTesticleRight;
            s.ligatureUsed = values.ligatureUsed;
            s.skinClosure = values.skinClosure;
            s.restraint = values.restraint;
          });
          navigation.navigate("InitialConsultationStepFive");
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicGroupOptions
                label={fields.locationTesticleLeft.label}
                fieldName="locationTesticleLeft"
                value={values?.locationTesticleLeft}
                setFieldValue={setFieldValue}
                options={fields.locationTesticleLeft.options}
              />

              <BasicGroupOptions
                label={fields.locationTesticleRight.label}
                fieldName="locationTesticleRight"
                value={values?.locationTesticleRight}
                setFieldValue={setFieldValue}
                options={fields.locationTesticleRight.options}
              />

              <BasicGroupOptions
                label={fields.ligatureUsed.label}
                fieldName="ligatureUsed"
                value={values?.ligatureUsed}
                setFieldValue={setFieldValue}
                options={fields.ligatureUsed.options}
              />
            </View>
            <FixedStepButton onPress={handleSubmit} progress="65%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
