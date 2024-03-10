import { useStyle } from "contexts/StyleProvider";
import { Text as RNText } from "react-native";
import { typography } from "style";

/**
 * Text component for displaying text. Has presets for different text styles.
 * @example
 * <Text preset="heading">Heading text</Text>
 */

export const Text = (props) => {
  const { colors: colorScheme } = useStyle();
  const { weight, size, text, children, style: styleOverride, ...rest } = props;

  const content = text || children;

  const preset = props.preset ?? "default";

  const fontWeightStyles = Object.entries(typography?.primary).reduce(
    (acc, [weight, fontFamily]) => {
      return { ...acc, [weight]: { fontFamily } };
    },
    {}
  );

  const baseStyle = [
    sizeStyles.sm,
    fontWeightStyles.medium,
    { color: colorScheme?.text },
  ];

  const presets = {
    default: baseStyle,
    bold: [baseStyle, fontWeightStyles.bold],
    heading: [baseStyle, sizeStyles.xxl, fontWeightStyles.bold],
    subheading: [baseStyle, sizeStyles.lg, fontWeightStyles.medium],
    formLabel: [baseStyle, sizeStyles.md, fontWeightStyles.medium],
    fieldOption: [baseStyle, sizeStyles.sm, fontWeightStyles.xs],
    formHelper: [baseStyle, sizeStyles.xs, fontWeightStyles.medium],
    toast: [baseStyle, sizeStyles.xs, fontWeightStyles.normal],
  };

  const styles = [
    presets[preset],
    weight && fontWeightStyles[weight],
    size && sizeStyles[size],
    styleOverride,
  ];

  return (
    <RNText {...rest} style={styles}>
      {content}
    </RNText>
  );
};

const sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 },
  xl: { fontSize: 24, lineHeight: 34 },
  lg: { fontSize: 20, lineHeight: 32 },
  md: { fontSize: 18, lineHeight: 26 },
  sm: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 14, lineHeight: 21 },
  xxs: { fontSize: 12, lineHeight: 18 },
};
