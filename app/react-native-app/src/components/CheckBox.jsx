import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import colors from "../configs/colors";

export const CheckBox = ({
  label,
  labelColor = colors.default,
  disabled = false,
  ...props
}) => {
  return (
    <View className="my-5 flex-row items-center space-x-2">
      <Checkbox disabled={disabled} {...props} />
      <Text className="text-xl" style={{ color: labelColor }}>
        {label}
      </Text>
    </View>
  );
};
