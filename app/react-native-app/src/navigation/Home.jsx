import { CaseDetail } from "screens/CaseDetail";
import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { CaseList } from "screens/CaseList";
import { UserHome } from "screens/UserHome";
import { font } from "style/style";
import { colors } from "style/style";

const headerOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
  headerTintColor: colors.light,
};

export const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserHome"
        component={UserHome}
        options={{
          headerBackground: () => <ScreenHeader title="Equine Castration" />,
          ...headerOptions,
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
        name="CaseList"
        component={CaseList}
        options={{
          headerBackground: () => (
            <ScreenHeader title="Caselist" fontSize={font.size["xl"]} />
          ),
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
};
