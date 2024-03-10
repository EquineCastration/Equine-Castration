import { useStyle } from "contexts/StyleProvider";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/**
 * Screen component for wrapping the entire screen. Useful when creating a new screen.
 */

export const Screen = ({ children, props }) => {
  const { colors } = useStyle();
  return (
    <SafeAreaView
      style={[container, { backgroundColor: colors.background, ...props }]}
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
