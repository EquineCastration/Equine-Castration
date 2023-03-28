import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";

export const BasicPicker = ({
  label,
  fieldName,
  children,
  value,
  setFieldValue,
}) => {
  return (
    <View className="my-5 space-y-3">
      <Text className="text-xl text-primary-700">{label}</Text>
      <View className="bg-primary-100">
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
