import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./screens/Login";
import { RecordList } from "./screens/RecordList";
import { InitialConsultationStepOne } from "./screens/InitialConsultation/InitialConsultationStepOne";
import { InitialConsultationStepTwo } from "./screens/InitialConsultation/InitialConsultationStepTwo";
import { InitialConsultationStepThree } from "./screens/InitialConsultation/InitialConsultationStepThree";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="RecordList" component={RecordList} />

        <Stack.Group>
          <Stack.Screen
            name="InitialConsultationStepOne"
            component={InitialConsultationStepOne}
          />
          <Stack.Screen
            name="InitialConsultationStepTwo"
            component={InitialConsultationStepTwo}
          />
          <Stack.Screen
            name="InitialConsultationStepThree"
            component={InitialConsultationStepThree}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
