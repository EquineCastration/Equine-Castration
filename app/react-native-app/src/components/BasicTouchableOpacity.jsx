import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const BasicTouchableOpacity = ({
  title,
  onPress,
  bgColor,
  color,
  icon,
  btnWidth = "100%",
}) => {
  return (
    <TouchableOpacity
      className="flex-row rounded-2xl space-x-2 items-center justify-center py-4"
      style={{
        backgroundColor: bgColor,
        width: btnWidth,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={27} color={color} />
      <Text className="text-3xl font-medium" style={{ color: color }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
