import { Stack } from "./navigationStack";
import { headerOptions } from "./HomeStack";
import { colors } from "style";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { resetInitialConsultationStore } from "store/InitialConsultationStore";
import { ScreenHeader } from "components/ScreenHeader";
import {
  InitialConsultationStepOne,
  InitialConsultationStepTwo,
  InitialConsultationStepThree,
  InitialConsultationStepFour,
  InitialConsultationStepFive,
  InitialConsultationStepSix,
  InitialConsultationStepSeven,
  InitialConsultationStepEight,
  Confirmation,
} from "screens/InitialConsultation";

export const InitialConsultationStack = ({ navigation, route }) => {
  const editData = route.params?.editData ?? undefined; // do we have data for editing ?
  const isFocused = useIsFocused();

  useEffect(() => {
    !isFocused && resetInitialConsultationStore(); // reset store when user exits the stack
  }, [isFocused]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
          ...headerOptions,
        }}
      >
        <Stack.Screen
          name="InitialConsultationStepOne"
          component={InitialConsultationStepOne}
          initialParams={{ editData }}
          options={{
            headerBackground: () => (
              <ScreenHeader title="Background Information" />
            ),
            headerLeft: () => (
              <Ionicons
                name={editData ? "arrow-back-outline" : "menu-outline"}
                size={24}
                color={colors.palette.primary100}
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
          options={{
            headerBackground: () => <ScreenHeader title="Horse Information" />,
          }}
          name="InitialConsultationStepTwo"
          component={InitialConsultationStepTwo}
        />
        <Stack.Screen
          options={{
            headerBackground: () => <ScreenHeader title="Surgical Technique" />,
          }}
          name="InitialConsultationStepThree"
          component={InitialConsultationStepThree}
        />
        <Stack.Screen
          options={{
            headerBackground: () => (
              <ScreenHeader title="Preoperative Management" />
            ),
          }}
          name="InitialConsultationStepFour"
          component={InitialConsultationStepFour}
        />
        <Stack.Screen
          options={{
            headerBackground: () => (
              <ScreenHeader title="Postoperative Management" />
            ),
          }}
          name="InitialConsultationStepFive"
          component={InitialConsultationStepFive}
        />
        <Stack.Screen
          options={{
            headerBackground: () => (
              <ScreenHeader title="Environmental Factors" />
            ),
          }}
          name="InitialConsultationStepSix"
          component={InitialConsultationStepSix}
        />
        <Stack.Screen
          options={{
            headerBackground: () => <ScreenHeader title="Complications" />,
          }}
          name="InitialConsultationStepSeven"
          component={InitialConsultationStepSeven}
        />
        <Stack.Screen
          options={{
            headerBackground: () => <ScreenHeader title="Discharge" />,
          }}
          name="InitialConsultationEight"
          component={InitialConsultationStepEight}
        />
        <Stack.Screen
          options={{
            headerBackground: () => <ScreenHeader title="Case Summary" />,
          }}
          name="InitialConsultationConfirmation"
          component={Confirmation}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
