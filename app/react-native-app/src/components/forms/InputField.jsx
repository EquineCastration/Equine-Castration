import { useField } from "formik";
import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStyle } from "contexts/StyleProvider";
import { spacing, typography } from "style";
import { FieldView } from "./FieldView";
import { FormError } from "./FormError";

/**
 * Input Field component for formik forms.
 * Supports text and password inputs.
 * Requires color scheme which comes from the StyleProvider context.
 */

export const InputField = ({
  name,
  label,
  labelAlign = "left",
  placeholder = label,
  labelColor,
  inputBorderColor,
  inputActiveBorderColor,
  type = "text",
  ...props
}) => {
  const { colors: colorScheme } = useStyle();
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isPwdHidden, setIsPwdHidden] = useState(true);

  return (
    <FieldView label={label} labelAlign={labelAlign} labelColor={labelColor}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colorScheme?.formOption}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            borderBottomWidth: 1,
            padding: spacing.xs,
            borderBottomColor: isFocused
              ? inputActiveBorderColor ?? colorScheme?.tint
              : inputBorderColor ?? colorScheme?.border,
            fontSize: 15,
            fontFamily: typography.primary.medium,
            color: colorScheme?.formLabel,
          }}
          onChangeText={field.onChange(field.name)}
          value={field.value?.toString()}
          secureTextEntry={type === "password" && isPwdHidden}
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity
            style={{ position: "absolute", top: 5, right: 8 }}
            onPress={() => setIsPwdHidden(!isPwdHidden)}
          >
            {isPwdHidden ? (
              <Ionicons
                name="eye-off-outline"
                size={24}
                color={labelColor ?? colorScheme?.text}
              />
            ) : (
              <Ionicons
                name="eye-outline"
                size={24}
                color={labelColor ?? colorScheme?.text}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {meta.touched && meta.error ? <FormError error={meta.error} /> : null}
    </FieldView>
  );
};
