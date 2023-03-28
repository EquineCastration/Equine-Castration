import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const BasicTouchableOpacity = ({
  title,
  onPress,
  bgColor = "bg-secondary-900",
  color = "text-primary-50",
  icon, // only accepts ionicons
  btnWidth = "100%",
}) => {
  return (
    <TouchableOpacity
      className={`my-2 flex-row space-x-2 items-center justify-center py-4 ${bgColor}`}
      style={{
        width: btnWidth,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="white" />
      <Text className={`text-xl font-medium ${color}`}>{title}</Text>
    </TouchableOpacity>
  );
};
