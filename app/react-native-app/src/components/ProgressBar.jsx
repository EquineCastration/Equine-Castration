import { View } from "react-native";

export const ProgressBar = ({ progress, color = "bg-secondary-900" }) => {
  return (
    <View className="bg-gray-200 h-2 my-4">
      <View
        className={`h-1 ${color}`}
        style={{
          width: progress,
        }}
      />
    </View>
  );
};
