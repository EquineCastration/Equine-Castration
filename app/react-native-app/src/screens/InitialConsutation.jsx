import { SafeAreaView, ScrollView, Text, View } from "react-native";

export const InitialConsutation = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="pt-14 px-5">
        <Text className="font-bold text-4xl">Initial Consulation</Text>
        <Text className="font-normal text-xl text-gray-400">
          Input the following information
        </Text>
        <View className="my-5"></View>
      </ScrollView>
    </SafeAreaView>
  );
};
