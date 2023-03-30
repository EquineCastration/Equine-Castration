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
                setFieldValue={setFieldValue}
                options={fields.locationTesticleLeft.options}
                selectedIndex={fields.locationTesticleLeft.options.findIndex(
                  (o) => values.locationTesticleLeft.startsWith(o)
                )}
              />

              <BasicGroupOptions
                label={fields.locationTesticleRight.label}
                fieldName="locationTesticleRight"
                setFieldValue={setFieldValue}
                options={fields.locationTesticleRight.options}
                selectedIndex={fields.locationTesticleRight.options.findIndex(
                  (o) => values.locationTesticleRight.startsWith(o)
                )}
              />

              <BasicGroupOptions
                label={fields.ligatureUsed.label}
                fieldName="ligatureUsed"
                setFieldValue={setFieldValue}
                options={fields.ligatureUsed.options}
                selectedIndex={fields.ligatureUsed.options.findIndex((o) =>
                  values.ligatureUsed.startsWith(o)
                )}
              />
            </View>
            <FixedStepButton onPress={() => handleSubmit()} progress="65%" />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
