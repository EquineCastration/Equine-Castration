import { BgGradient } from "./BgGradient";
import { Text } from "react-native";
import { colors, font } from "style/style";

export const ScreenHeader = ({
  title,
  color = colors.primary[50],
  fontWeight = 300,
  fontSize = font.size["4xl"],
  icon,
}) => (
  <BgGradient>
    <Text
      style={{
        color,
        fontWeight,
        fontSize,
        marginBottom: 10,
      }}
    >
      {icon} {title}
    </Text>
  </BgGradient>
);
