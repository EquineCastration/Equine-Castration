import { InitialConsultationStore, ICStoreInitialState } from "store/store";
import { Layout } from "./InitialConsultationStepOne";
import { FixedStepButton } from "./InitialConsultationStepOne";
import { queryBase } from "db/queries/base";
import { CaseSummary } from "components/CaseSummary";
import { View } from "react-native";

const handleInitialConsultationSubmit = (navigation, data) => {
  queryBase.insertData("InitialConsultation", data);
  InitialConsultationStore.replace(ICStoreInitialState);
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

export const Confirmation = ({ navigation }) => {
  const data = InitialConsultationStore.useState();

  return (
    <>
      <Layout secondaryTxt="Confirm the information">
        <CaseSummary data={data} />
      </Layout>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: "white",
        }}
      >
        <FixedStepButton
          onPress={() => handleInitialConsultationSubmit(navigation, data)}
          title="Confirm"
          progress="95%"
        />
      </View>
    </>
  );
};
