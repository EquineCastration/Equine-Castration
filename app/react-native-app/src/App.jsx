import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "screens/Login";
import { RecordList } from "screens/RecordList";
import { InitialConsultationStepOne } from "screens/InitialConsultation/InitialConsultationStepOne";
import { InitialConsultationStepTwo } from "screens/InitialConsultation/InitialConsultationStepTwo";
import { InitialConsultationStepThree } from "screens/InitialConsultation/InitialConsultationStepThree";
import { Confirmation } from "screens/InitialConsultation/Confirmation";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const commontHeaderOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackground: () => (
                <LinearGradient
                  colors={["#38B2AC", "#1A365D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="flex-1 justify-end items-center"
                >
                  <Text className="text-primary-50 font-light text-3xl mb-4">
                    Equine Castration
                  </Text>
                </LinearGradient>
              ),
              ...commontHeaderOptions,
            }}
          />

          <Stack.Screen
            name="RecordList"
            component={RecordList}
            options={{ ...commontHeaderOptions }}
          />

          <Stack.Group screenOptions={{ ...commontHeaderOptions }}>
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
            <Stack.Screen
              name="InitialConsultationConfirmation"
              component={Confirmation}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
