import { InitialConsulationStore, ICStoreInitialState } from "store/store";
import { Layout } from "./InitialConsultationStepOne";
import { Text, View } from "react-native";
import { FixedStepButton } from "./InitialConsultationStepOne";
import { queryBase } from "db/queries/base";

const handleInitialConsultationSubmit = (navigation, data) => {
  queryBase.insertData("InitialConsultation", data);
  InitialConsulationStore.replace(ICStoreInitialState);
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

export const Confirmation = ({ navigation }) => {
  const data = InitialConsulationStore.useState();

  return (
    <Layout secondaryTxt="Confirm the information">
      <View className="flex-1 mt-5">
        {Object.keys(data).map((item, index) => (
          <View className="my-1 flex-row align-middle" key={index}>
            <Text className="font-light text-lg">{`${item} -`}</Text>
            <Text className="font-bold text-lg">{data[item]}</Text>
          </View>
        ))}
        <FixedStepButton
          onPress={() => handleInitialConsultationSubmit(navigation, data)}
          title="Confirm"
          progress="95%"
        />
      </View>
    </Layout>
  );
};
