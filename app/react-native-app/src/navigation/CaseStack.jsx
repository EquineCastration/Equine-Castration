import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { font, colors } from "style/style";
import { CaseDetail } from "screens/CaseDetail";
import { CaseList } from "screens/CaseList";
import { headerOptions } from "./HomeStack";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { InitialConsultationStack } from "./InitialConsultationStack";
import { CaseOverview } from "screens/CaseOverview";
import { SurveyForm } from "screens/Survey/SurveyForm";

export const CaseStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CaseList"
        component={CaseList}
        options={{
          headerBackground: () => (
            <ScreenHeader title="Cases" fontSize={font.size["xl"]} />
          ),
          ...headerOptions,
          headerLeft: () => (
            <Ionicons
              name="menu-outline"
              size={24}
              color={colors.light}
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
              title={`${route.params.caseData.horseName} - Case Overview`}
              fontSize={font.size.md}
              fontWeight={400}
              icon={<FontAwesome5 name="horse-head" size={18} />}
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
              title={`${route.params.caseData.horseName} - Case detail`}
              fontSize={font.size.md}
              fontWeight={400}
              icon={<FontAwesome5 name="horse-head" size={18} />}
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
        name="CreateSurvey"
        component={SurveyForm}
        options={({ route }) => ({
          headerBackground: () => (
            <ScreenHeader
              title={`${route.params.surveyType?.name} - Survey form`}
              fontSize={font.size.md}
              fontWeight={400}
              icon={<FontAwesome name="wpforms" size={18} />}
            />
          ),
          ...headerOptions,
        })}
      />
    </Stack.Navigator>
  );
};
