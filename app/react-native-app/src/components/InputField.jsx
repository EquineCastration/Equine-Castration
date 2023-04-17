import { useField } from "formik";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { colors, font } from "style/style";

export const InputField = ({
  name,
  label,
  placeholder = label,
  labelColor = colors.primary[700],
  inputBorderColor = colors.primary[200],
  inputActiveBorderColor = colors.primary[500],
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        marginVertical: 8,
        backgroundColor: colors.ui.bg,
        paddingHorizontal: 8,
        borderRadius: 8,
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            marginBottom: 5,
            fontSize: font.size.normal,
            color: labelColor,
          }}
        >
          {label}
        </Text>
        <TextInput
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            backgroundColor: colors.light,
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            borderColor: isFocused ? inputActiveBorderColor : inputBorderColor,
          }}
          onChangeText={field.onChange(field.name)}
          value={field.value || field.value.toString()}
          {...props}
        />

        {meta.touched && meta.error ? (
          <Text style={{ marginTop: 5, color: colors.error }}>
            {meta.error}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
