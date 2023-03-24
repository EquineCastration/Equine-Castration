import { SafeAreaView, View, Text } from "react-native";
import { BasicTouchableOpacity } from "../components/BasicTouchableOpacity";

export const Login = ({ navigation }) => {
  // should be loaded as screen to get navigation prop

  const welcomeTxt = "Welcome Vet";
  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-5">
      <Text className="text-6xl font-thin text-center">{welcomeTxt}</Text>

      <View className="flex w-full px-2 items-center">
        <BasicTouchableOpacity
          title="Please Enter"
          btnWidth="75%"
          icon="arrow-forward-circle-outline"
          onPress={() => navigation.navigate("InitialConsultationStepOne")}
        />
      </View>
    </SafeAreaView>
  );
};
