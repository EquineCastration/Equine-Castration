import { View, Button, ToastAndroid, Text } from "react-native";
import { Layout } from "./InitialConsultationStepOne";
import { InitialConsulationStore } from "../../store/store";
import { Formik } from "formik";
import { CheckBox } from "../../components/CheckBox";
import { ProgressBar } from "../../components/ProgressBar";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../store/db";
import { InputField } from "../../components/InputField";
import colors from "../../configs/colors";
import { BasicPicker } from "../../components/BasicPicker";

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
          ? ToastAndroid.show(
              "Initial Consultation record created",
              ToastAndroid.SHORT
            ) // only works in Android
          : ToastAndroid.show(
              "Failed Creating Initial Consultation record",
              ToastAndroid.SHORT
            ); // only works in Android
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
    <Layout backNavigation={() => navigation.goBack()}>
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
            <View className="justify-end mb-12 flex-1">
              <Button onPress={handleSubmit} title="submit" />
              <ProgressBar progress="85%" />
            </View>
          </View>
        )}
      </Formik>
    </Layout>
  );
};
