import { SafeAreaView, View, Text } from "react-native";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { initialsOptions } from "store/initialOptions";

export const Login = ({ navigation }) => {
  // should be loaded as screen to get navigation prop
  const welcomeTxt = "Welcome Vet";
  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-5 bg-white">
      <Text className="text-5xl font-thin text-center">{welcomeTxt}</Text>

      <View className="flex w-full px-2 items-center">
        {initialsOptions &&
          initialsOptions.map((option, index) => {
            return (
              <BasicTouchableOpacity
                key={index}
                title={option.title}
                btnWidth="85%"
                icon={option.icon}
                bgColor={option.bgColor}
                onPress={
                  option.navigate &&
                  (() => navigation.navigate(option.navigate))
                }
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
};
