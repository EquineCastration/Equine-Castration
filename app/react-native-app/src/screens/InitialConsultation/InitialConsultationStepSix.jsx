import { View } from "react-native";
import { Formik } from "formik";
import { InitialConsultationStore, InitialConsultationForm } from "store/store";
import {
  Layout,
  FixedStepButton,
  InitialValues,
} from "./InitialConsultationStepOne";
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

  const [selectedEnvIndex, setSelectedEnvIndex] = useState(
    // create a boolean array that represents 'environment' field options
    // if there's any match with the initial
    fields.environment.options.map((o) => initialValues.environment.includes(o))
  );

  const handleOptionSelect = (index) => {
    const newSelections = [...selectedEnvIndex];
    newSelections[index] = !newSelections[index];
    setSelectedEnvIndex(newSelections);

    const selectedValues = fields.environment.options.filter(
      (o, index) => newSelections[index]
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
                  value={selectedEnvIndex[index]}
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
