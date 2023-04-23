import { Stack } from "./navigationStack";
import { AccountLogin } from "screens/Account/AccountLogin";
import {
  RegistrationStepOne,
  RegistrationStepTwo,
  RegistrationStepGDPR,
} from "screens/Account/Registration";

export const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountLogin" component={AccountLogin} />

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
    </Stack.Navigator>
  );
};
