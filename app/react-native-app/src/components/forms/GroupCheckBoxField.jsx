import { useField } from "formik";
import { View } from "react-native";
import Checkbox from "expo-checkbox";
import { FieldView } from "./FieldView";
import { spacing } from "style";
import { useStyle } from "contexts/StyleProvider";
import { FormError } from "./FormError";
import { Text } from "components/Text";

/**
 * Checkbox Field component for formik forms. Supports single and multiple selections.
 * In single selection mode, the value is a string representing the selected option.
 * In multiple, the value is an array containing all selected options.
 * Requires color scheme which comes from the StyleProvider context.
 */

export const GroupCheckBoxField = ({
  name,
  label,
  labelAlign,
  labelColor,
  options = [],
  disabled = false,
  multiSelect = false, // if true, then it will be a multi-select checkbox
}) => {
  const { colors: colorScheme } = useStyle();
  const [field, meta, helpers] = useField(name);

  const handleChange = (value) => {
    helpers.setValue(
      multiSelect
        ? field.value.includes(value)
          ? field.value.filter((item) => item !== value)
          : [...field.value, value]
        : value
    );
  };

  return (
    <FieldView label={label} labelAlign={labelAlign} labelColor={labelColor}>
      {options.map((option, index) => {
        return (
          <View
            key={index}
            style={{
              marginTop: spacing.xs,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              disabled={disabled}
              style={{ width: 20, height: 20 }}
              value={
                multiSelect
                  ? field.value.includes(option)
                  : field.value === option
              }
              onValueChange={() => handleChange(option)}
            />
            <Text
              preset="fieldOption"
              style={{
                paddingVertical: spacing.xxs,
                color: colorScheme?.formOption,
                marginLeft: spacing.xs,
              }}
            >
              {option}
            </Text>
          </View>
        );
      })}

      {meta.touched && meta.error ? <FormError error={meta.error} /> : null}
    </FieldView>
  );
};
