import { View } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { db } from "store/db";
import { InitialConsulationStore } from "store/store";
import { BasicPicker } from "components/BasicPicker";
import { FixedStepButton } from "./InitialConsultationStepOne";
import { Layout } from "./InitialConsultationStepOne";

const handleInitialConsultationSubmit = (navigation, data) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into InititalConsultation (horseName, clientSurname, dateOfCastration, isLessThanTwo, ageAboveTwo, weight, breed, technique) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data?.horseName,
        data?.clientSurname,
        data?.dateOfCastration,
        data?.isLessThanTwo,
        data?.ageAboveTwo,
        data?.weight,
        data?.breed,
        data?.technique,
      ],
      (_, result) => {
        result.rowsAffected > 0
          ? Toast.show({
              type: "success",
              text1: "Initial Consultation record created",
            })
          : Toast.show({
              type: "error",
              text1: "Initial Consultation record created",
            });
      },
      (_, err) => console.log("Error creating table", err)
    );
  });

  InitialConsulationStore.replace({
    horseName: "",
    clientSurname: "",
    dateOfCastration: "",
    isLessThanTwo: false,
    ageAboveTwo: 0,
    weight: 0,
    breed: "",
    technique: "",
    progress: 0,
  });
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

const info = {
  breed: [
    "TB or TB cross",
    "WB or WB cross",
    "Draft or draft cross",
    "Cob",
    "Pony",
    "Miniature breed",
    "Donkey",
    "Donkey",
  ],
  technique: [
    "Tunica vaginalis removed (open technique)",
    "Tunica vaginalis removed (closed technique)",
    "Tunica vaginalis incised then removed (semi-closed)",
    "Other technique e.g. Henderson tool, laparoscopic",
  ],
};

export const InitialConsultationStepThree = ({ navigation }) => {
  const data = InitialConsulationStore.useState();

  return (
    <Layout>
      <Formik
        initialValues={{
          breed: data?.breed || "",
          technique: data?.technique || "",
        }}
        onSubmit={(values) => {
          InitialConsulationStore.update((s) => {
            s.breed = values.breed;
            s.technique = values.technique;
          });
          handleInitialConsultationSubmit(navigation, data);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View className="flex-1">
            <View className="my-2">
              <BasicPicker
                label="Breed"
                fieldName="breed"
                value={values?.breed}
                setFieldValue={setFieldValue}
              >
                {info?.breed.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </BasicPicker>

              <BasicPicker
                label="Technique"
                fieldName="technique"
                value={values?.technique}
                setFieldValue={setFieldValue}
              >
                {info?.technique.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </BasicPicker>
            </View>
            <FixedStepButton
              onPress={handleSubmit}
              title="submit"
              progress="95%"
            />
          </View>
        )}
      </Formik>
    </Layout>
  );
};
