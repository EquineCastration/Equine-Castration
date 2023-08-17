import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, font } from "style/style";

export const ActionButton = ({
  iconName,
  title = "Action button",
  color = colors.ui.btnBg,
  ...props
}) => (
  <TouchableOpacity
    style={{
      borderWidth: 1,
      borderColor: color,
      color: color,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      width: "20%",
      ...props,
    }}
  >
    <Ionicons name={iconName} size={18} color={color} />
    <Text
      style={{
        fontSize: font.size["xs"],
        fontWeight: 300,
        marginHorizontal: 10,
        color: color,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
