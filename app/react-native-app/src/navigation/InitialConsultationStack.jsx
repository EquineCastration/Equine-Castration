import { Stack } from "./navigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { font, colors } from "style/style";

import { InitialConsultationStepOne } from "screens/InitialConsultation/InitialConsultationStepOne";
import { InitialConsultationStepTwo } from "screens/InitialConsultation/InitialConsultationStepTwo";
import { InitialConsultationStepThree } from "screens/InitialConsultation/InitialConsultationStepThree";
import { InitialConsultationStepFour } from "screens/InitialConsultation/InitialConsultationStepFour";
import { InitialConsultationStepFive } from "screens/InitialConsultation/InitialConsultationStepFive";
import { InitialConsultationStepSix } from "screens/InitialConsultation/InitialConsultationStepSix";
import { Confirmation } from "screens/InitialConsultation/Confirmation";
import { headerOptions } from "./HomeStack";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { resetInitialConsultationStore } from "store/InitialConsultationStore";

export const InitialConsultationStack = ({ navigation, route }) => {
  const editData = route.params?.editData ?? undefined; // are we editing a case?
  const isFocused = useIsFocused();

  useEffect(() => {
    !isFocused && resetInitialConsultationStore(); // reset store when user exits the stack
  }, [isFocused]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          headerBackground: () => (
            <ScreenHeader
              title={
                editData
                  ? `Editing case of ${route.params.editData.horseName}`
                  : "Initial Consultation"
              }
              fontSize={editData ? font.size["xl"] : font.size["2xl"]}
            />
          ),
          ...headerOptions,
        }}
      >
        <Stack.Screen
          name="InitialConsultationStepOne"
          component={InitialConsultationStepOne}
          initialParams={{ editData }}
          options={{
            headerLeft: () => (
              <Ionicons
                name={editData ? "arrow-back-outline" : "menu-outline"}
                size={24}
                color={colors.light}
                onPress={() =>
                  editData
                    ? (resetInitialConsultationStore(), navigation.goBack())
                    : navigation.openDrawer()
                }
              />
            ),
          }}
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
