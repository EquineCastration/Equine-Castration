import { View } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";
import { BasicPicker } from "components/BasicPicker";
import { FixedStepButton, InitialValues } from "./InitialConsultationStepOne";
import { Layout } from "./InitialConsultationStepOne";
import { InputField } from "components/InputField";

export const InitialConsultationStepFour = ({ navigation }) => {
  const keysArr = ["skinClosure", "restraint"];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    fields,
    InitialConsultationStore.useState()
  );

  return (
    <Layout>
      <Formik
        initialValues={{
          ...initialValues,
          otherSkinClosure: "",
          restraintStanding: "",
        }}
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.skinClosure = values.skinClosure;
            s.restraint = values.restraint;
          });
          navigation.navigate("InitialConsultationConfirmation");
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <View>
              <BasicPicker
                label={fields.skinClosure.label}
                fieldName="skinClosure"
                value={values?.skinClosure}
                setFieldValue={setFieldValue}
              >
                {fields.skinClosure.options.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </BasicPicker>

              {values?.skinClosure.startsWith("Other") && (
                <InputField
                  label={values.skinClosure}
                  value={values?.otherSkinClosure}
                />
              )}

              <BasicPicker
                label={fields.restraint.label}
                fieldName="restraint"
                value={values?.restraint}
                setFieldValue={setFieldValue}
              >
                {fields.restraint.options((item, index) => (
                  <Picker.Item key={index} label={item.option} value={item} />
                ))}
              </BasicPicker>

              {values?.restraint === "Standing" && (
                <InputField
                  label={values.skinClosure}
                  value={values?.otherSkinClosure}
                />
              )}
            </View>
            <FixedStepButton onPress={handleSubmit} progress="65%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
