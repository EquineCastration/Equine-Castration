import { SafeAreaView, View } from "react-native";
import { colors } from "style/style";

export const DefaultLayout = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.light,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
