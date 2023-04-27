import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { UserHome } from "screens/UserHome";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "style/style";
import { useEffect } from "react";
import { resetInitialConsultationStore } from "store/InitialConsultationStore";

export const headerOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
  headerTintColor: colors.light,
};

export const HomeStack = ({ navigation }) => {
  useEffect(() => {
    resetInitialConsultationStore();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserHome"
        component={UserHome}
        options={{
          headerBackground: () => <ScreenHeader title="Equine Castration" />,
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
    </Stack.Navigator>
  );
};
