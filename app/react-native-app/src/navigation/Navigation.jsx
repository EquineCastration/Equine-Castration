import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./navigationStack";

import { useUser } from "contexts/User";
import { DrawerNavigator } from "./DrawerNavigator";
import { AccountStack } from "./AccountStack";

export const Navigation = () => {
  const { user } = useUser();
  return (
    <NavigationContainer>
      {user ? (
        <DrawerNavigator />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Account" component={AccountStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
