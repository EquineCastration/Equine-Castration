import { DefaultLayout } from "layout/DefaultLayout";
import { CaseSummary } from "components/CaseSummary";
import { ScrollView } from "react-native";
export const CaseDetail = ({ route }) => {
  const { caseData } = route.params;

  return (
    <DefaultLayout>
      <ScrollView
        style={{
          marginVertical: 2,
          marginHorizontal: 5,
          paddingHorizontal: 5,
        }}
      >
        <CaseSummary data={caseData} />
      </ScrollView>
    </DefaultLayout>
  );
};
