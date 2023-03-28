import { InitialConsulationStore, ICStoreInitialState } from "store/store";
import { Layout } from "./InitialConsultationStepOne";
import { Text, View } from "react-native";
import { FixedStepButton } from "./InitialConsultationStepOne";
import { queryBase } from "db/queries/base";
import { font } from "style/style";

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
      <View
        style={{
          flex: 1,
          marginTop: 15,
          marginBottom: 20,
        }}
      >
        {Object.keys(data).map((item, index) => (
          <View
            key={index}
            style={{
              marginVertical: 7,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: 300,
                fontSize: font.size["normal"],
              }}
            >{`${item} -`}</Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: font.size["normal"],
              }}
            >
              {data[item]}
            </Text>
          </View>
        ))}
      </View>
      <FixedStepButton
        onPress={() => handleInitialConsultationSubmit(navigation, data)}
        title="Confirm"
        progress="95%"
      />
    </Layout>
  );
};
