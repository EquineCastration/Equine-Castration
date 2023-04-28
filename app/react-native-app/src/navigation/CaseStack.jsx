import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { font, colors } from "style/style";
import { CaseDetail } from "screens/CaseDetail";
import { CaseList } from "screens/CaseList";
import { headerOptions } from "./HomeStack";
import { Ionicons } from "@expo/vector-icons";
import { InitialConsultationStack } from "./InitialConsultationStack";

export const CaseStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CaseList"
        component={CaseList}
        options={{
          headerBackground: () => (
            <ScreenHeader title="Caselist" fontSize={font.size["xl"]} />
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
        name="CaseDetail"
        component={CaseDetail}
        options={({ route }) => ({
          headerBackground: () => (
            <ScreenHeader
              title={`Case detail of ${route.params.caseData.horseName}`}
              fontSize={font.size.md}
              fontWeight={400}
            />
          ),
          ...headerOptions,
        })}
      />
      <Stack.Screen
        name="EditInitialConsultation"
        component={InitialConsultationStack}
      />
    </Stack.Navigator>
  );
};
