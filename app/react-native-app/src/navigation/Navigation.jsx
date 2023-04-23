import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./navigationStack";
import { Account } from "./Account";
import { Home } from "./Home";
import { InitialConsultation } from "./InitialConsultation";
import { useUser } from "contexts/User";

export const Navigation = () => {
  const { user } = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Account" component={Account} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="InitialConsultation"
              component={InitialConsultation}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
