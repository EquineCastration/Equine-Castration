import { FixedStepButton } from "components/FixedStepButton";
import { DefaultLayout } from "layout/DefaultLayout";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { spacing } from "style";

/**
 * Layout for the multi-step form
 */

export const Layout = ({ children, onSubmit, current, buttonTitle }) => {
  return (
    <DefaultLayout>
      <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
      <View
        style={{
          marginHorizontal: spacing.sm,
        }}
      >
        <FixedStepButton
          onPress={onSubmit}
          current={current}
          title={buttonTitle}
          total={7}
        />
      </View>
    </DefaultLayout>
  );
};
