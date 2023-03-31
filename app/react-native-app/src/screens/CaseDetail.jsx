import { DefaultLayout } from "layout/DefaultLayout";
import { CaseSummary } from "components/CaseSummary";
import { ScrollView } from "react-native";
export const CaseDetail = ({ route }) => {
  const { caseData } = route.params;

  return (
    <DefaultLayout
      primaryTxt="Case summary"
      secondaryTxt={`Horse name: ${caseData.horseName}`}
    >
      <ScrollView>
        <CaseSummary data={caseData} />
      </ScrollView>
    </DefaultLayout>
  );
};
