import { useStyle } from "contexts/StyleProvider";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/**
 * Screen component for wrapping the entire screen. Useful when creating a new screen
 */

export const Screen = ({ children, style }) => {
  const { colors: colorScheme } = useStyle();
  return (
    <SafeAreaView
      style={[
        container,
        { backgroundColor: colorScheme?.background, ...style },
      ]}
    >
      <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const container = {
  flex: 1,
  height: "100%",
  width: "100%",
};
