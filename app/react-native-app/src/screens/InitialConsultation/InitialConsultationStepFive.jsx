import { View } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";
import { BasicPicker } from "components/BasicPicker";
import {
  Layout,
  FixedStepButton,
  InitialValues,
} from "./InitialConsultationStepOne";
import { InputField } from "components/InputField";
import { BasicGroupOptions } from "components/BasicGroupOptions";

export const InitialConsultationStepFive = ({ navigation }) => {
  const keysArr = ["skinClosure", "restraint"];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const standingOptions =
    (
      fields.restraint.options.find(
        // if no match (option 'standing') then return empty object
        (restraint) => restraint.option === "Standing"
      ) || {}
    ).labels || []; // if match return array labels, else an empty array

  const initialRestraintStanding =
    // if restraint is 'standing' then return standing restraint value
    initialValues.restraint.startsWith("Standing") &&
    // compare ending with existing standing restraint options
    standingOptions.find((value) => initialValues.restraint.endsWith(value));

  return (
    <Layout>
      <Formik
        initialValues={{
          ...initialValues,
          otherSkinClosure: "",
          restraintStanding: initialRestraintStanding || "",
        }}
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.skinClosure = values.skinClosure;
            s.restraint =
              values.restraint === "Standing" && values.restraintStanding
                ? `${values.restraint} - ${values.restraintStanding}` // concat if standing option selected
                : values.restraint;
          });
          navigation.navigate("InitialConsultationStepSix");
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

              <BasicGroupOptions
                label={fields.restraint.label}
                fieldName="restraint"
                options={fields.restraint.options.map(
                  (restraint) => restraint.option
                )}
                setFieldValue={setFieldValue}
                selectedIndex={fields.restraint.options.findIndex(
                  (o) => values.restraint.startsWith(o.option) // helps in matching for concatenated value
                )}
              />

              {values?.restraint?.startsWith("Standing") && (
                <BasicGroupOptions
                  label="Standing restraint"
                  fieldName="restraintStanding"
                  options={standingOptions}
                  setFieldValue={setFieldValue}
                  selectedIndex={standingOptions.findIndex(
                    (option) => values.restraintStanding === option
                  )}
                />
              )}
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="80%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
