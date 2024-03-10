import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "./Text";
import { colors } from "style";

export const Spinner = ({ text = "Loading" }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Text weight="semiBold">{text}</Text>
      <ActivityIndicator size="large" color={colors.palette.primary400} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: colors.transparent,
  },
});
