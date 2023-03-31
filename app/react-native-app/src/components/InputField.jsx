import { useField } from "formik";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { colors, font } from "style/style";

export const InputField = ({
  label,
  placeholder = label,
  labelColor = colors.primary[700],
  inputBorderColor = colors.primary[200],
  inputActiveBorderColor = colors.primary[500],
  icon,
  err,
  pwd,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          marginVertical: 2,
          fontSize: font.size["md"],
          color: labelColor,
        }}
      >
        {label}
      </Text>

      <View style={{ marginVertical: 10 }}>
        <TextInput
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            borderWidth: 1,
            borderRadius: 2,
            padding: 5,
            borderColor: isFocused ? inputActiveBorderColor : inputBorderColor,
          }}
          onChangeText={field.onChange(field.name)}
          value={field.value}
          {...props}
        />

        {meta.touched && meta.error ? (
          <Text style={{ marginTop: 5, color: "red" }}>{meta.error}</Text>
        ) : null}
      </View>
    </View>
  );
};
