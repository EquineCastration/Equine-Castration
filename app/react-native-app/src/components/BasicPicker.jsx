import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";
import { font, colors } from "style/style";

export const BasicPicker = ({
  label,
  fieldName,
  children,
  value,
  setFieldValue,
}) => {
  return (
    <View
      style={{
        marginVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: font.size["md"],
          color: colors.primary[700],
          marginVertical: 8,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          backgroundColor: colors.primary[100],
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={(fieldNameValue) =>
            setFieldValue(fieldName, fieldNameValue)
          }
        >
          <Picker.Item label={`Select ${label}`} value="" enabled={false} />
          {children}
        </Picker>
      </View>
    </View>
  );
};
