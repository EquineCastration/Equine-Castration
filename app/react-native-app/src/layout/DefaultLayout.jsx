import { useStyle } from "contexts/StyleProvider";
import { SafeAreaView, View } from "react-native";

export const DefaultLayout = ({ children }) => {
  const { colors: colorScheme } = useStyle();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme?.background,
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
