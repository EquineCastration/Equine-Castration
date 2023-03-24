import { View } from "react-native";
import colors from "../configs/colors";
export const ProgressBar = ({ progress, color = colors.secondary }) => {
  return (
    <View className="bg-gray-200 h-2 my-2">
      <View
        className="h-1"
        style={{
          width: progress,
          backgroundColor: color,
        }}
      />
    </View>
  );
};
