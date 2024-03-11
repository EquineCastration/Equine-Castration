import { Text } from "components/Text";
import { useStyle } from "contexts/StyleProvider";
import { View } from "react-native";
import { spacing } from "style";

/**
 * This component can be used as a base for form fields layout/view.
 * Useful for creating consistent look and feel for all form fields.
 */

export const FieldView = ({
  label,
  labelAlign = "left",
  labelColor,
  outerStyle,
  children,
}) => {
  const { colors: colorScheme } = useStyle();
  return (
    <View style={[style, outerStyle]}>
      <Text
        preset="formLabel"
        style={{
          textAlign: labelAlign,
          marginBottom: spacing.xxs,
          color: labelColor ?? colorScheme?.formLabel,
        }}
        weight="semiBold"
      >
        {label}
      </Text>

      {children}
    </View>
  );
};

const style = {
  marginVertical: spacing.xs,
  padding: spacing.md,
};
