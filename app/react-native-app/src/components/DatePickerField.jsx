import { useState } from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import colors from "../configs/colors";

export const DatePickerField = ({
  label,
  placeholder = label,
  labelColor = colors.default,
  inputBorderColor = colors.fiedDefaultBorder,
  value,
  setFieldValue,
  name,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
      <Text className="my-2 text-xl" style={{ color: labelColor }}>
        {label}
      </Text>
      <TextInput
        editable={false}
        placeholder={placeholder}
        className="border-2 rounded-md p-2"
        style={{
          borderColor: inputBorderColor,
        }}
        value={value}
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
