import { View, TouchableOpacity, Text } from "react-native";
import { font, colors } from "style/style";
import { useField } from "formik";

export const BasicGroupOptionsField = ({
  label = "Group options",
  labelColor = colors.primary[700],
  name,
  options = ["Option 1", "Option 2"],
  borderColor = colors.primary[200],
  selectecBgColor = colors.secondary[700],
  selectedColor = colors.light,
  paddingVertical = 10,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleValueChange = (value) => {
    helpers.setValue(value);
  };

  const style = {
    border: {
      borderRadius: 5,
      borderColor: borderColor,
      borderWidth: 1,
    },
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
        <View
          style={{
            flexDirection: "row",
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
                  paddingHorizontal: 5,
                  backgroundColor:
                    field.value === option ? selectecBgColor : "transparent", // if value matches with option then apply highlight
                  margin: 10,
                  ...style.border,
                }}
                onPress={() => handleValueChange(option)}
              >
                <Text
                  style={{
                    fontSize: font.size.normal,
                    fontWeight: 400,
                    color: field.value === option ? selectedColor : labelColor, // if value matches with option then apply highlight
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
