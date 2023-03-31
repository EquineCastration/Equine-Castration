import { View, TouchableOpacity, Text } from "react-native";
import { font, colors } from "style/style";
import { useEffect, useState } from "react";
import { useField } from "formik";

export const BasicGroupOptionsField = ({
  label = "Group options",
  labelColor = colors.primary[700],
  name,
  options = ["Option 1", "Option 2"],
  borderColor = colors.primary[200],
  selectecBgColor = colors.secondary[700],
  selectedColor = colors.light,
  paddingVertical = 3,
}) => {
  const [field, meta, helpers] = useField(name);

  const [selected, setSelected] = useState(field.value || options[0]);

  const style = {
    border: {
      borderRadius: 5,
      borderColor: borderColor,
      borderWidth: 1,
    },
  };

  useEffect(() => {
    helpers.setValue(selected);
  }, [selected]);

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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {options.map((option, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: paddingVertical,
                  backgroundColor:
                    selected === option ? selectecBgColor : "transparent",
                  marginHorizontal: 4,
                  marginVertical: 4,
                  ...style.border,
                }}
                onPress={() => setSelected(option)}
              >
                <Text
                  style={{
                    fontSize: font.size.sm,
                    fontWeight: 400,
                    color: selected === option ? selectedColor : labelColor,
                    marginHorizontal: 10,
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
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
