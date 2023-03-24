import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import colors from "../configs/colors";

export const CheckBox = ({
  label,
  labelColor = colors.default,
  disabled = false,
}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View className="my-5 flex-row items-center space-x-2">
      <Checkbox
        disabled={disabled}
        value={toggleCheckBox}
        onValueChange={setToggleCheckBox}
      />
      <Text className="text-xl" style={{ color: labelColor }}>
        {label}
      </Text>
    </View>
  );
};
