import { useField } from "formik";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { colors, font } from "style/style";

export const CheckBoxField = ({
  name,
  label,
  labelColor = colors.primary[700],
  disabled = false,
  bgColor = colors.ui.bg,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <View
      style={{
        marginVertical: 8,
        backgroundColor: bgColor,
        paddingHorizontal: 8,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          disabled={disabled}
          style={{ width: 18, height: 18 }}
          value={field.value}
          onValueChange={handleChange}
          {...props}
        />
        <Text
          style={{
            marginVertical: 2,
            fontSize: font.size["normal"],
            color: labelColor,
            marginLeft: 7,
          }}
        >
          {label}
        </Text>
      </View>
      {meta.touched && meta.error ? (
        <Text style={{ marginTop: 5, color: colors.error }}>{meta.error}</Text>
      ) : null}
    </View>
  );
};
