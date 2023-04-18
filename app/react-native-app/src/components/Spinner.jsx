import { colors } from "style/style";
import { View, ActivityIndicator } from "react-native";

export const Spinner = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginVertical: 16,
      }}
    >
      <ActivityIndicator size={32} color={colors.primary[800]} />
    </View>
  );
};
