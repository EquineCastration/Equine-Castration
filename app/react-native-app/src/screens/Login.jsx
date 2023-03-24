import { SafeAreaView, View, Text } from "react-native";
import { BasicTouchableOpacity } from "../components/BasicTouchableOpacity";

import colors from "../configs/colors";

export const Login = () => {
  const welcomeTxt = "Welcome Vet";
  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-5">
      <Text className="text-6xl font-thin text-center">{welcomeTxt}</Text>

      <View className="flex w-full px-2 items-center">
        <BasicTouchableOpacity
          title="Please Enter"
          btnWidth="75%"
          icon="arrow-forward-circle-outline"
        />
      </View>
    </SafeAreaView>
  );
};
