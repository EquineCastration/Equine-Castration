import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export const InputField = ({
  label,
  placeholder = label,
  labelColor = "text-primary-700",
  inputBorderColor = "border-primary-200",
  inputActiveBorderColor = "border-primary-500",
  icon,
  err,
  pwd,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="my-5">
      <Text className={`my-2 text-xl ${labelColor}`}>{label}</Text>

      <TextInput
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`border-2 rounded-md p-2 ${
          isFocused ? inputActiveBorderColor : inputBorderColor
        }`}
        {...props}
      />
    </View>
  );
};
