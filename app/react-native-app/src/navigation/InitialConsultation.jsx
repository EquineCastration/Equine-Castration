import Stack from "./NavigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { colors, font } from "style/style";
import {
  InitialConsultationStepOne,
  InitialConsultationStepTwo,
  InitialConsultationStepThree,
  InitialConsultationStepFour,
  InitialConsultationStepFive,
  InitialConsultationStepSix,
  Confirmation,
} from "screens/InitialConsultation/InitialConsultationStepOne";
import { CaseDetail } from "screens/CaseDetail";

const headerOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
  headerTintColor: colors.light,
};

export const InitialConsultation = () => {
  return (
    <Stack.Navigator>
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
          ...headerOptions,
        })}
      />
    </Stack.Navigator>
  );
};
