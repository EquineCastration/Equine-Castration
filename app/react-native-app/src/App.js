import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import colors from "./configs/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: colors.primary,
          fontSize: 40,
          fontWeight: 200,
        }}
      >
        Hello Vet
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
