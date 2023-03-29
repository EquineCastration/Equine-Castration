import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { colors, font } from "style/style";

export const CheckBox = ({
  label,
  labelColor = colors.primary[700],
  disabled = false,
  ...props
}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Checkbox disabled={disabled} {...props} />
      <Text
        style={{
          marginVertical: 2,
          fontSize: font.size["md"],
          color: labelColor,
          marginLeft: 7,
        }}
      >
        {label}
      </Text>
    </View>
  );
};
