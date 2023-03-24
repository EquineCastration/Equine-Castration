import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import colors from "../configs/colors";
export const InputField = ({
  label,
  placeholder = label,
  labelColor = colors.default,
  inputBorderColor = colors.fiedDefaultBorder,
  inputActiveBorderColor = colors.fiedActiveBorder,
  icon,
  err,
  pwd,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="my-5">
      <Text className="my-2 text-xl" style={{ color: labelColor }}>
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border-2 rounded-md p-2"
        style={{
          borderColor: isFocused ? inputActiveBorderColor : inputBorderColor,
        }}
        {...props}
      />
    </View>
  );
};
