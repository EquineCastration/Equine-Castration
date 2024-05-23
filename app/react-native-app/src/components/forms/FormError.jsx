import { Text } from "components/Text";
import { useStyle } from "contexts/StyleProvider";
import { View } from "react-native";
import { spacing } from "style";

/**
 * This component can be used to display form errors.
 */

export const FormError = ({ error }) => {
  const { colors: colorScheme } = useStyle();

  return (
    <View
      style={{
        marginTop: spacing.xxs,
        padding: spacing.xxs,
        backgroundColor: colorScheme?.errorBackground,
      }}
    >
      <Text
        preset="formHelper"
        style={{
          color: colorScheme?.error,
        }}
      >
        {error}
      </Text>
    </View>
  );
};
