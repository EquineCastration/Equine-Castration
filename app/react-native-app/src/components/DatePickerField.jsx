import { useState } from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { colors, font } from "style/style";

export const DatePickerField = ({
  label,
  placeholder = label,
  labelColor = colors.primary[700],
  inputBorderColor = colors.primary[200],
  value,
  setFieldValue,
  name,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  return (
    <TouchableOpacity
      style={{
        marginVertical: 10,
      }}
      onPress={() => setIsDatePickerVisible(true)}
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
      <TextInput
        editable={false}
        placeholder={placeholder}
        value={value}
        style={{
          borderWidth: 1,
          borderRadius: 2,
          padding: 5,
          borderColor: inputBorderColor,
          marginVertical: 10,
        }}
      />
      <DateTimePickerModal
        initialDate=""
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setFieldValue(name, moment(date).format("DD/MM/YYYY"));
          setIsDatePickerVisible(false);
        }}
        onCancel={() => setIsDatePickerVisible(false)}
      />
    </TouchableOpacity>
  );
};
