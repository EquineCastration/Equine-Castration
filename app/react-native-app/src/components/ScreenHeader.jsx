import { colors, spacing } from "style";
import { BgGradient } from "./BgGradient";
import { Text } from "./Text";
import { View } from "react-native";

export const ScreenHeader = ({ title }) => (
  <BgGradient>
    <View style={{ width: "75%" }}>
      <Text
        size="lg"
        weight="normal"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          alignSelf: "center",
          marginBottom: spacing.xs,
          color: colors.stone,
        }}
      >
        {title}
      </Text>
    </View>
  </BgGradient>
);
