import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { font, colors } from "style/style";

export const BasicTouchableOpacity = ({
  title,
  onPress,
  bgColor = colors.secondary[900],
  color = colors.primary[50],
  icon, // only accepts ionicons
  btnWidth = "100%",
}) => {
  return (
    <TouchableOpacity
      style={{
        width: btnWidth,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: bgColor,
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="white" />
      <Text
        style={{
          fontSize: font.size["md"],
          fontWeight: 500,
          color: color,
          marginHorizontal: 10,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
