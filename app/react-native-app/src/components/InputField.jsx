import { useField } from "formik";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { colors, font } from "style/style";
import { Ionicons } from "@expo/vector-icons";

export const InputField = ({
  name,
  label,
  labelAlign = "left",
  placeholder = label,
  labelColor = colors.primary[700],
  inputBorderColor = colors.primary[200],
  inputActiveBorderColor = colors.primary[500],
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isPwdHidden, setIsPwdHidden] = useState(true);

  return (
    <View
      style={{
        marginVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            textAlign: labelAlign,
            marginBottom: 5,
            fontSize: font.size.md,
            color: labelColor,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flex: 1,
              backgroundColor: colors.light,
              borderBottomWidth: 1,
              paddingHorizontal: 5,
              paddingVertical: 12,
              borderBottomColor: isFocused
                ? inputActiveBorderColor
                : inputBorderColor,
              fontSize: font.size.normal,
            }}
            onChangeText={field.onChange(field.name)}
            value={field.value.toString()}
            secureTextEntry={type === "password" && isPwdHidden}
            {...props}
          />
          {type === "password" && (
            <TouchableOpacity
              style={{ position: "absolute", top: 5, right: 8 }}
              onPress={() => setIsPwdHidden(!isPwdHidden)}
            >
              {isPwdHidden ? (
                <Ionicons name="eye-off-outline" size={24} color={labelColor} />
              ) : (
                <Ionicons name="eye-outline" size={24} color={labelColor} />
              )}
            </TouchableOpacity>
          )}
        </View>
        {meta.touched && meta.error ? (
          <Text style={{ marginTop: 5, color: colors.error }}>
            {meta.error}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
