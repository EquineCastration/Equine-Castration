import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { font, colors } from "style/style";

export const BasicTouchableOpacity = ({
  title,
  color = colors.light,
  icon, // only accepts ionicons
  iconSize = 24,
  fontWeight = 400,
  fontSize = font.size.md,
  onPress,
  bgColor = colors.ui.btnBg,
  btnWidth = "100%",
  paddingVertical = 8,
  borderRadius = 10,
  transparent = false,
  ...props
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
        backgroundColor: !transparent && bgColor,
        borderRadius,
        ...props,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={iconSize} color={color} />
      <Text
        style={{
          fontSize,
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
