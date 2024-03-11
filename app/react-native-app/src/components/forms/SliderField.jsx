import { Slider } from "react-native-awesome-slider";
import { useField } from "formik";
import { FieldView } from "./FieldView";
import { FormError } from "./FormError";
import { useSharedValue } from "react-native-reanimated";
import { spacing } from "style";
import { useStyle } from "contexts/StyleProvider";
import { Text } from "components/Text";

/**
 * Slider Field component for formik form.
 */

export const SliderField = ({
  name,
  label,
  labelAlign = "left",
  labelColor,
  maxVal,
  disabled,
  ...props
}) => {
  const { colors: colorScheme } = useStyle();
  const [field, meta, helpers] = useField(name);

  const progress = useSharedValue(field.value ?? 0);
  const min = useSharedValue(0);
  const max = useSharedValue(maxVal ?? 100);

  return (
    <FieldView label={label} labelAlign={labelAlign} labelColor={labelColor}>
      <Slider
        style={{
          marginTop: spacing.sm,
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        step={maxVal}
        onSlidingComplete={(value) => {
          helpers.setValue(value);
        }}
        theme={{
          minimumTrackTintColor: colorScheme?.button,
          maximumTrackTintColor: colorScheme?.textDim,
          bubbleBackgroundColor: colorScheme?.button,
        }}
        disable={disabled}
        {...props}
      />
      <Text preset="formLabel" style={{ color: colorScheme?.button }}>
        {field.value}
      </Text>
      {meta.touched && meta.error ? <FormError error={meta.error} /> : null}
    </FieldView>
  );
};
