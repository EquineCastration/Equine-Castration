import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { colors, font } from "style/style";

import { CaseDetail } from "screens/CaseDetail";
import { InitialConsultationStepOne } from "screens/InitialConsultation/InitialConsultationStepOne";
import { InitialConsultationStepTwo } from "screens/InitialConsultation/InitialConsultationStepTwo";
import { InitialConsultationStepThree } from "screens/InitialConsultation/InitialConsultationStepThree";
import { InitialConsultationStepFour } from "screens/InitialConsultation/InitialConsultationStepFour";
import { InitialConsultationStepFive } from "screens/InitialConsultation/InitialConsultationStepFive";
import { InitialConsultationStepSix } from "screens/InitialConsultation/InitialConsultationStepSix";
import { Confirmation } from "screens/InitialConsultation/Confirmation";

const headerOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
  headerTintColor: colors.light,
};

export const InitialConsultation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          headerBackground: () => (
            <ScreenHeader
              title="Initial Consultation"
              fontSize={font.size["2xl"]}
            />
          ),
          ...headerOptions,
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
  );
};
