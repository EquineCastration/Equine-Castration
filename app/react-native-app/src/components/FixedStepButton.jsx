import { View } from "react-native";
import { Button } from "./Button";
import { Text } from "./Text";
import { spacing } from "style";
import { useStyle } from "contexts/StyleProvider";

// Standard next step button component with progress bar
export const FixedStepButton = ({
  onPress,
  title = "Next",
  current,
  total,
}) => {
  const { colors: colorScheme } = useStyle();
  return (
    <View
      style={{
        marginVertical: spacing.md,
        justifyContent: "flex-end",
        zIndex: -1,
      }}
    >
      <Button
        preset="filled"
        onPress={onPress}
        text={title}
        style={{
          paddingVertical: spacing.xs,
          marginVertical: spacing.xxs,
        }}
      />
      <ProgressBar
        total={total}
        current={current}
        activeColor={colorScheme?.tint}
        bgColor={colorScheme?.border}
      />
    </View>
  );
};

export const ProgressBar = ({
  total = 1,
  current = 1,
  activeColor,
  bgColor,
}) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <View>
      <View
        style={{
          backgroundColor: bgColor,
          height: spacing.xs,
          borderRadius: 4,
        }}
      >
        <View
          style={{
            backgroundColor: activeColor,
            height: spacing.xs,
            width: percentage + "%",
            borderRadius: 4,
          }}
        />
      </View>
      <Text
        size="xxs"
        style={{
          textAlign: "center",
        }}
      >{`${current} of ${total}`}</Text>
    </View>
  );
};
