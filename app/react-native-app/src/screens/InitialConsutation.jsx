import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { Input } from "../components/Input";
import colors from "../configs/colors";

export const InitialConsutation = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="pt-14 px-5">
        <Text className="font-bold text-4xl" style={{ color: colors.primary }}>
          Initial Consulation
        </Text>
        <Text className="font-normal text-xl" style={{ color: colors.lghtTxt }}>
          Input the following information
        </Text>
        <View className="my-5">
          <Input label="Horse name:" />
          <Input label="Client surname:" />
          <Input label="Date of castration:" type="date" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
