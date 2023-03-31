import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { font, colors } from "style/style";

export const BasicTouchableOpacity = ({
  title,
  onPress,
  color = colors.light,
  bgColor = colors.ui.btnBg,
  icon, // only accepts ionicons
  btnWidth = "100%",
  paddingVertical = 8,
  borderRadius = 10,
  fontWeight = 400,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: btnWidth,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical,
        backgroundColor: bgColor,
        borderRadius,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color />
      <Text
        style={{
          fontSize: font.size.md,
          fontWeight,
          color,
          marginHorizontal: 10,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
