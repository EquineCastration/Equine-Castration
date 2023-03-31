import { SafeAreaView, View } from "react-native";

export const DefaultLayout = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
