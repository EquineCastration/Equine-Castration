import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";
import colors from "../configs/colors";

export const BasicPicker = ({
  label,
  fieldName,
  children,
  value,
  setFieldValue,
}) => {
  return (
    <View className="my-5 space-y-3">
      <Text className="text-xl" style={{ color: colors.default }}>
        {label}
      </Text>
      <Picker
        style={{
          backgroundColor: colors.lightBg,
        }}
        selectedValue={value}
        onValueChange={(fieldNameValue) =>
          setFieldValue(fieldName, fieldNameValue)
        }
      >
        <Picker.Item label={`Select ${label}`} value="" enabled={false} />
        {children}
      </Picker>
    </View>
  );
};
