import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "screens/Login";
import { CaseList } from "screens/CaseList";
import { InitialConsultationStepOne } from "screens/InitialConsultation/InitialConsultationStepOne";
import { InitialConsultationStepTwo } from "screens/InitialConsultation/InitialConsultationStepTwo";
import { InitialConsultationStepThree } from "screens/InitialConsultation/InitialConsultationStepThree";
import { InitialConsultationStepFour } from "screens/InitialConsultation/InitialConsultationStepFour";
import { InitialConsultationStepFive } from "screens/InitialConsultation/InitialConsultationStepFive";
import { InitialConsultationStepSix } from "screens/InitialConsultation/InitialConsultationStepSix";
import { Confirmation } from "screens/InitialConsultation/Confirmation";
import Toast from "react-native-toast-message";
import { BgGradient } from "components/BgGradient";
import { Text } from "react-native";
import { colors, font } from "style/style";

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
                <BgGradient>
                  <Text
                    style={{
                      color: colors.primary[50],
                      fontWeight: 300,
                      fontSize: font.size["3xl"],
                      marginBottom: 10,
                    }}
                  >
                    Equine Castration
                  </Text>
                </BgGradient>
              ),
              ...commontHeaderOptions,
            }}
          />

          <Stack.Screen
            name="CaseList"
            component={CaseList}
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
              name="InitialConsultationStepFour"
              component={InitialConsultationStepFour}
            />
            <Stack.Screen
              name="InitialConsultationStepFive"
              component={InitialConsultationStepFive}
            />
            <Stack.Screen
              name="InitialConsultationStepSix"
              component={InitialConsultationStepSix}
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
