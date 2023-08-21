import { View } from "react-native";
import { colors } from "style/style";
import { BasicTouchableOpacity } from "./BasicTouchableOpacity";
import { ProgressBar } from "./ProgressBar";

// Standard next step button component with progress bar
export const FixedStepButton = ({
  onPress,
  title = "Next",
  current,
  total,
}) => {
  return (
    <View
      style={{
        marginVertical: 12,
        justifyContent: "flex-end",
        zIndex: -1,
      }}
    >
      <BasicTouchableOpacity
        onPress={onPress}
        title={title}
        paddingVertical={7}
      />
      <ProgressBar total={total} current={current} color={colors.ui.btnBg} />
    </View>
  );
};
