import { View } from "react-native";

import { Formik } from "formik";
import { object, string } from "yup";

import { BasicPickerField } from "components/BasicPickerField";
import { InputField } from "components/InputField";
import { BasicGroupOptionsField } from "components/BasicGroupOptionsField";

import { InitialConsultationStore } from "store/InitialConsultationStore";
import { Layout, InitialValues } from "./InitialConsultationStepOne";
import { initialConsultation } from "constants/initial-consultation";

export const InitialConsultationStepFour = ({ navigation }) => {
  const keysArr = [
    "skinClosure",
    "skinClosureOther",
    "restraint",
    "restraintStanding",
  ];
  const fields = initialConsultation.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const validationSchema = object().shape({
    skinClosure: string()
      .oneOf(fields.skinClosure.options, "Invalid skin closure")
      .required("Skin Closure required"),
    restraint: string()
      .oneOf(fields.restraint.options, "Invalid restraint")
      .required("Restraint required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        InitialConsultationStore.update((s) => {
          s.skinClosure = values.skinClosure;
          s.skinClosureOther =
            values.skinClosure === "Other" ? values.skinClosureOther : ""; // only if the 'skinClosure' is 'Other' else ''
          s.restraint = values.restraint;
          s.restraintStanding =
            values.restraint === "Standing" ? values.restraintStanding : ""; // only if the 'restraint' is 'Standing' else ''
        });
        navigation.navigate("InitialConsultationStepFive");
      }}
    >
      {({ handleSubmit, values }) => (
        <Layout onSubmit={() => handleSubmit()} current={4}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicPickerField
                label={fields.skinClosure.label}
                name="skinClosure"
                pickerItems={fields.skinClosure.options}
              />

              {values?.skinClosure === "Other" && (
                <InputField
                  label={fields.skinClosureOther.label}
                  name="skinClosureOther"
                />
              )}

              <BasicGroupOptionsField
                label={fields.restraint.label}
                name="restraint"
                options={fields.restraint.options}
              />

              {values?.restraint === "Standing" && (
                <BasicGroupOptionsField
                  label={fields.restraintStanding.label}
                  name="restraintStanding"
                  options={fields.restraintStanding.options}
                />
              )}
            </View>
          </View>
        </Layout>
      )}
    </Formik>
  );
};
