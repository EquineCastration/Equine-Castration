import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../configs/colors";

export const BasicTouchableOpacity = ({
  title,
  onPress,
  bgColor = colors.secondary,
  color = "white",
  icon,
  btnWidth = "100%",
}) => {
  return (
    <TouchableOpacity
      className="my-5 flex-row rounded-2xl space-x-2 items-center justify-center py-3"
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
