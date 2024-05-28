import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { colors } from "style";
import { headerOptions } from "./HomeStack";
import { Ionicons } from "@expo/vector-icons";
import { InitialConsultationStack } from "./InitialConsultationStack";
import { CaseList, CaseOverview, CaseDetail } from "screens/Case";
import { SurveyForm } from "screens/Survey/SurveyForm";

export const CaseStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CaseList"
        component={CaseList}
        options={{
          headerBackground: () => <ScreenHeader title="Cases" />,
          ...headerOptions,
          headerLeft: () => (
            <Ionicons
              name="menu-outline"
              size={24}
              color={colors.stone}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CaseOverview"
        component={CaseOverview}
        options={({ route }) => ({
          headerBackground: () => (
            <ScreenHeader
              title={`Case Overview - ${route.params.caseData?.horse?.name}`}
            />
          ),
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="CaseDetail"
        component={CaseDetail}
        options={({ route }) => ({
          headerBackground: () => (
            <ScreenHeader
              title={`Case detail - ${route.params.caseData?.horse?.name}`}
            />
          ),
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="EditInitialConsultation"
        component={InitialConsultationStack}
      />
      <Stack.Screen
        name="SurveyForm"
        component={SurveyForm}
        options={({ route }) => ({
          headerBackground: () => (
            <ScreenHeader
              title={`${route.params.surveyType?.name} - Survey form`}
            />
          ),
          ...headerOptions,
        })}
      />
    </Stack.Navigator>
  );
};
