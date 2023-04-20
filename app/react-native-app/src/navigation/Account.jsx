import Stack from "./NavigationStack";
import { AccountLogin } from "screens/Account/AccountLogin";
import {
  RegistrationStepOne,
  RegistrationStepTwo,
  RegistrationStepGDPR,
} from "screens/Account/Registration";

export const Account = () => {
  return (
    <Stack.Navigator>
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