import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../configs/colors";

export const BasicTouchableOpacity = ({
  title,
  onPress,
  bgColor = colors.secondary,
  color = "white",
  icon, // only accepts ionicons
  btnWidth = "100%",
}) => {
  return (
    <TouchableOpacity
      className="my-2 flex-row space-x-2 items-center justify-center py-4"
      style={{
        backgroundColor: bgColor,
        width: btnWidth,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color={color} />
      <Text className="text-xl font-medium" style={{ color: color }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
