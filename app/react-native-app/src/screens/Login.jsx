import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { SafeAreaView, View, Text } from "react-native";

export const Login = ({ navigation }) => {
  // should be loaded as screen to get navigation prop
  const welcomeTxt = "Welcome Vet";

  const initialsOptions = [
    {
      title: "Initial Consultation",
      navigate: "InitialConsultationStepOne", // screen name
      icon: "ios-brush-outline", // only accepts ionicons
    },
    {
      title: "List of Horses",
      navigate: "RecordList", // screen name
      icon: "documents-outline", // only accepts ionicons
    },
    {
      title: "Follow up",
      bgColor: "bg-patra-900",
      icon: "expand-outline",
    },
    {
      title: "Review",
      bgColor: "bg-kanaka-900",
      icon: "file-tray-full-outline",
    },
  ];

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
