import { View } from "react-native";
import { colors } from "style/style";

export const ProgressBar = ({ progress, color = colors.secondary[900] }) => {
  return (
    <View
      style={{
        backgroundColor: colors.primary[200],
        height: 5,
        marginVertical: 15,
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
