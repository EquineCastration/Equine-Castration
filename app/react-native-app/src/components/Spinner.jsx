import { colors, font } from "style/style";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export const Spinner = ({ text = "Loading" }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Text style={styles.loadingTxt}>{text}</Text>
      <ActivityIndicator size="large" color={colors.primary[900]} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: colors.ui.bgTransparent,
  },
  loadingTxt: {
    color: colors.primary[700],
    fontSize: font.size["md"],
    fontWeight: 200,
    marginBottom: 5,
  },
});
