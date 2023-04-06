import { InitialConsultationStore, ICStoreInitialState } from "store/store";
import { Layout } from "./InitialConsultationStepOne";
import { queryBase } from "db/queries/base";
import { CaseSummary } from "components/CaseSummary";

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
    <Layout
      onSubmit={() => handleInitialConsultationSubmit(navigation, data)}
      current={7}
      title="Confirm"
    >
      <CaseSummary data={data} />
    </Layout>
  );
};
