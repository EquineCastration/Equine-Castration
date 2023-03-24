import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./screens/Login";
import {
  InitialConsultationStepOne,
  InitialConsultationStepTwo,
} from "./screens/InitialConsultation";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Group>
          <Stack.Screen
            name="InitialConsultationStepOne"
            component={InitialConsultationStepOne}
          />
          <Stack.Screen
            name="InitialConsultationStepTwo"
            component={InitialConsultationStepTwo}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
