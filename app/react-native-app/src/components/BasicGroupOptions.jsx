import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { font, colors } from "style/style";
import { useEffect, useState } from "react";

export const BasicGroupOptions = ({
  label = "Group options",
  labelColor = colors.primary[700],
  fieldName,
  setFieldValue,
  options = ["Option 1", "Option 2"],
  selectedIndex, // this allows correct option is selected
  borderColor = colors.primary[200],
  color = colors.primary[700],
  selectecBgColor = colors.secondary[700],
  selectedColor = colors.primary[50],
  paddingVertical = 2,
}) => {
  const [selected, setSelected] = useState(
    // ensures only valid index is used
    selectedIndex >= 0 && selectedIndex < options.length
      ? options[selectedIndex]
      : options[0] // default select index 0
  );

  useEffect(() => {
    setFieldValue && setFieldValue(fieldName, selected);
  }, [selected]);

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
      <View
        style={{
          flex: 1,
          marginVertical: 8,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          borderColor: borderColor,
          borderWidth: 1,
          padding: 5,
        }}
      >
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: paddingVertical,
                backgroundColor:
                  selected === option ? selectecBgColor : "transparent",
                borderRadius: 7,
              }}
              onPress={() => setSelected(option)}
            >
              <Ionicons name={option.icon} size={24} color="white" />
              <Text
                style={{
                  fontSize: font.size["normal"],
                  fontWeight: 500,
                  color: selected === option ? selectedColor : color,
                  marginHorizontal: 10,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
