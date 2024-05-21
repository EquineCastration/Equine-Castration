import { Pressable } from "react-native";
import { Text } from "./Text";
import { typography, spacing, colors } from "style";
import { useStyle } from "contexts/StyleProvider";

/**
 * A button component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @example
 * <Button
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export const Button = (props) => {
  const {
    text,
    style: viewStyleOverride,
    pressedStyle: pressedViewStyleOverride,
    textStyle: textStyleOverride,
    pressedTextStyle: pressedTextStyleOverride,
    disabledTextStyle: disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: disabledViewStyleOverride,
    preset = "default",
    ...rest
  } = props;

  const { colors: colorScheme } = useStyle();

  const viewPresets = {
    default: [
      baseViewStyle,
      {
        borderWidth: 1,
        borderColor: colorScheme?.button ?? colors.palette.primary300,
      },
    ],

    filled: [
      baseViewStyle,
      { backgroundColor: colorScheme?.button ?? colors.palette.primary },
    ],

    ghost: [
      baseViewStyle,
      {
        backgroundColor: "transparent",
        padding: 0,
      },
    ],
  };

  const textPresets = {
    default: [
      baseTextStyle,
      { color: colorScheme?.button ?? colors.palette.primary500 },
    ],
    filled: [baseTextStyle, { color: colors.palette.primary100 }],
  };

  const viewStyle = ({ pressed }) => {
    return [
      viewPresets[preset],
      viewStyleOverride,
      pressed && [pressedViewPresets[preset], pressedViewStyleOverride],
      disabled && disabledViewStyleOverride,
    ];
  };

  const textStyle = ({ pressed }) => {
    return [
      textPresets[preset],
      textStyleOverride,
      pressed && [pressedTextPresets[preset], pressedTextStyleOverride],
      disabled && disabledTextStyleOverride,
    ];
  };

  return (
    <Pressable
      style={viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <>
          {LeftAccessory && (
            <LeftAccessory
              style={leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <Text text={text} style={textStyle(state)}>
            {children}
          </Text>

          {RightAccessory && (
            <RightAccessory
              style={rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
};

const baseViewStyle = {
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  padding: spacing.md,
  overflow: "hidden",
};

const baseTextStyle = {
  fontSize: 16,
  lineHeight: 18,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  letterSpacing: 1,
  textTransform: "uppercase",
};

const rightAccessoryStyle = { marginStart: spacing.xs, zIndex: 1 };
const leftAccessoryStyle = { marginEnd: spacing.xs, zIndex: 1 };

const pressedViewPresets = {
  default: {
    backgroundColor: colors.palette.primary500,
  },
  filled: {
    backgroundColor: colors.palette.primary400,
  },
};

const pressedTextPresets = {
  default: { opacity: 0.9, color: colors.palette.primary100 },
  filled: { opacity: 0.9, color: colors.palette.primary100 },
};
