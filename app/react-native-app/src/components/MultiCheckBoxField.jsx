import { useField } from "formik";
import { View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { colors, font } from "style/style";
import { useState } from "react";

export const MultiCheckBoxField = ({
  name,
  items,
  label,
  labelColor = colors.primary[700],
  borderColor = colors.primary[200],
}) => {
  const [field, meta, helpers] = useField(name);
  const [selected, setSelected] = useState(field.value);

  const handleChange = (value) => {
    const isSelected = selected.includes(value);
    const newSelectedItems = isSelected
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(newSelectedItems);
    helpers.setValue(newSelectedItems);
  };

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

        <View
          style={{
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            borderRadius: 5,
            borderColor: borderColor,
            borderWidth: 1,
          }}
        >
          {items?.length >= 1 &&
            items.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 2,
                }}
              >
                <Checkbox
                  style={{ width: 15, height: 15 }}
                  value={selected.includes(item)}
                  onValueChange={() => handleChange(item)}
                />
                <Text
                  style={{
                    marginVertical: 2,
                    fontSize: font.size.sm,
                    color: labelColor,
                    marginLeft: 7,
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
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
