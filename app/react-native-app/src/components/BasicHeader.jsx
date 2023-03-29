import { Text, View } from "react-native";
import { colors, font } from "style/style";

export const BasicHeader = ({
  primaryTxt,
  secondaryTxt,
  primaryColor = colors.primary[900],
  secondaryColor = colors.primary[500],
}) => {
  return (
    <View>
      <Text
        style={{
          color: primaryColor,
          fontSize: font.size["3xl"],
          fontWeight: 700,
        }}
      >
        {primaryTxt}
      </Text>
      <Text
        style={{
          color: secondaryColor,
          fontSize: font.size["md"],
          fontWeight: 400,
        }}
      >
        {secondaryTxt}
      </Text>
    </View>
  );
};
