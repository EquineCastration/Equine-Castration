import { Text } from "components/Text";
import { View } from "react-native";
import { colors } from "style";
import { spacing } from "style";

/**
 * This component can be used to display form errors.
 */

export const FormError = ({ error }) => (
  <View
    style={{
      marginTop: spacing.xxs,
      padding: spacing.xxs,
      backgroundColor: colors.errorBackground,
    }}
  >
    <Text
      preset="formHelper"
      style={{
        color: colors.error,
      }}
    >
      {error}
    </Text>
  </View>
);
