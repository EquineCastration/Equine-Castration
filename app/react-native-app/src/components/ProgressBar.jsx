import { View } from "react-native";
import { colors } from "style/style";

export const ProgressBar = ({ progress, color = colors.primary[800] }) => {
  // could add text that shows progress percentage
  // change the color based on the progression
  return (
    <View
      style={{
        backgroundColor: colors.primary[200],
        height: 5,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          height: 5,
          backgroundColor: color,
          width: progress,
        }}
      />
    </View>
  );
};
