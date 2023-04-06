import { View, Text } from "react-native";
import { colors, font } from "style/style";

export const ProgressBar = ({
  total = 1,
  current = 1,
  color = colors.primary[800],
}) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.primary[200],
          height: 5,
          marginVertical: 2,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            backgroundColor: color,
            height: 5,
            width: percentage + "%",
            borderRadius: 5,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: font.size.xs,
        }}
      >
        {`${current} of ${total} (${percentage}%)`}
      </Text>
    </View>
  );
};
