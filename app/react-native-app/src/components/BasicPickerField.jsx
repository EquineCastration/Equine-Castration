import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";
import { font, colors } from "style/style";
import { useField } from "formik";

export const BasicPickerField = ({
  name,
  label,
  pickerItems,
  labelColor = colors.primary[700],
  borderColor = colors.primary[200],
  numberOfLines,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleValueChange = (value) => {
    helpers.setValue(value);
  };
  return (
    <View
      style={{
        marginVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            marginBottom: 5,
            fontSize: font.size.md,
            color: labelColor,
          }}
        >
          {label}
        </Text>

        <Picker
          selectedValue={field.value}
          onValueChange={handleValueChange}
          itemStyle={fieldStyle}
          style={{ backgroundColor: colors.light }}
          numberOfLines={numberOfLines || 1}
        >
          <Picker.Item label={`Select ${label}`} value={0} enabled={false} />
          {pickerItems.map((item, index) => (
            <Picker.Item label={item.toString()} value={item} key={index} />
          ))}
        </Picker>
      </View>
      {meta.touched && meta.error ? (
        <Text style={{ marginTop: 5, color: colors.error }}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

const fieldStyle = {
  backgroundColor: colors.light,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: colors.ui.border,
  fontSize: font.size.md,
  height: 115,
  flexWrap: "wrap",
};
