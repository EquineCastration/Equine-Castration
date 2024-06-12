import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./navigationStack";

import { useUser } from "contexts/User";
import { DrawerNavigator } from "./DrawerNavigator";
import { AccountStack } from "./AccountStack";
import { CommonStack } from "./CommonStack";

export const Navigation = () => {
  const { user } = useUser();
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="CommonStack" component={CommonStack} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Account" component={AccountStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
