import { BackendApiProvider } from "contexts/BackendApi";
import { BackendConfigProvider } from "contexts/Config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "screens/Home";
import { CaseList } from "screens/CaseList";
import { InitialConsultationStepOne } from "screens/InitialConsultation/InitialConsultationStepOne";
import { InitialConsultationStepTwo } from "screens/InitialConsultation/InitialConsultationStepTwo";
import { InitialConsultationStepThree } from "screens/InitialConsultation/InitialConsultationStepThree";
import { InitialConsultationStepFour } from "screens/InitialConsultation/InitialConsultationStepFour";
import { InitialConsultationStepFive } from "screens/InitialConsultation/InitialConsultationStepFive";
import { InitialConsultationStepSix } from "screens/InitialConsultation/InitialConsultationStepSix";
import { Confirmation } from "screens/InitialConsultation/Confirmation";
import Toast from "react-native-toast-message";
import { colors, font } from "style/style";
import { CaseDetail } from "screens/CaseDetail";
import { ScreenHeader } from "components/ScreenHeader";
import {
  RegistrationStepOne,
  RegistrationStepTwo,
  RegistrationStepGDPR,
} from "screens/Account/Registration";
import { Suspense } from "react";
import { Spinner } from "components/Spinner";
import { AccountLogin } from "screens/Account/AccountLogin";
import { UserProvider } from "contexts/User";

const Stack = createNativeStackNavigator();

const commonHeaderOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
  headerTintColor: colors.light,
};

export default function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <BackendApiProvider>
          <UserProvider>
            <BackendConfigProvider>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="AccountLogin" component={AccountLogin} />

                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                      headerBackground: () => (
                        <ScreenHeader title="Equine Castration" />
                      ),
                      ...commonHeaderOptions,
                    }}
                  />

                  <Stack.Group>
                    <Stack.Screen
                      name="RegistrationStepOne"
                      component={RegistrationStepOne}
                    />
                    <Stack.Screen
                      name="RegistrationStepTwo"
                      component={RegistrationStepTwo}
                    />
                    <Stack.Screen
                      name="RegistrationStepGDPR"
                      component={RegistrationStepGDPR}
                    />
                  </Stack.Group>

                  <Stack.Screen
                    name="CaseList"
                    component={CaseList}
                    options={{
                      headerBackground: () => (
                        <ScreenHeader
                          title="Case list"
                          fontSize={font.size.xl}
                        />
                      ),
                      ...commonHeaderOptions,
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
                      ...commonHeaderOptions,
                    })}
                  />

                  <Stack.Group
                    screenOptions={{
                      headerBackground: () => (
                        <ScreenHeader
                          title="Initial Consultation"
                          fontSize={font.size["2xl"]}
                        />
                      ),
                      ...commonHeaderOptions,
                    }}
                  >
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
            </BackendConfigProvider>
          </UserProvider>
        </BackendApiProvider>
      </Suspense>
      <Toast />
    </>
  );
}
