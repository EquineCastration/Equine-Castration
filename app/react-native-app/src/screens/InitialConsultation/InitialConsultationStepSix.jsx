import { View } from "react-native";
import { Formik } from "formik";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";
import { FixedStepButton, InitialValues } from "./InitialConsultationStepOne";
import { Layout } from "./InitialConsultationStepOne";
import { InputField } from "components/InputField";
import { BasicGroupOptions } from "components/BasicGroupOptions";
import { useState } from "react";
import { CheckBox } from "components/CheckBox";

export const InitialConsultationStepSix = ({ navigation }) => {
  const keysArr = ["environment", "location"];
  const fields = InitialConsultationForm.fields;
  const initialValues = InitialValues(
    keysArr,
    InitialConsultationStore.useState()
  );

  const [selectedEnvironment, setSelectedEnvironment] = useState(
    fields.environment.options.map(() => false)
  );

  const handleOptionSelect = (index) => {
    const newSelections = [...selectedEnvironment];
    newSelections[index] = !newSelections[index];
    setSelectedEnvironment(newSelections);

    const selectedValues = fields.environment.options.filter(
      (option, index) => newSelections[index]
    );

    console.log(selectedValues);
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          InitialConsultationStore.update((s) => {
            s.environment = values.environment;
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
              {fields.environment.options.map((option, index) => (
                <CheckBox
                  key={index}
                  label={option}
                  value={selectedEnvironment[index]}
                  onValueChange={() => handleOptionSelect(index)}
                />
              ))}
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="80%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
