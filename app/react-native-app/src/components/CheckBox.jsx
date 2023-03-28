import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";

export const CheckBox = ({
  label,
  labelColor = "text-primary-700",
  disabled = false,
  ...props
}) => {
  return (
    <View className="my-5 flex-row items-center space-x-2">
      <Checkbox disabled={disabled} {...props} />
      <Text className={`my-2 text-xl ${labelColor}`}>{label}</Text>
    </View>
  );
};
