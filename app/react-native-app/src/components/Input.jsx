import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

import colors from "../configs/colors";
export const Input = ({
  label,
  placeholder = label,
  labelColor = colors.default,
  inputBorderColor = colors.fiedDefaultBorder,
  inputActiveBorderColor = colors.fiedActiveBorder,
  icon,
  err,
  pwd,
  type = "text",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <View className="mb-5">
      <Text className="my-2 text-xl" style={{ color: labelColor }}>
        {label}
      </Text>
      {type === "text" && (
        <TextInput
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="border-2 rounded-md p-2"
          style={{
            borderColor: isFocused ? inputActiveBorderColor : inputBorderColor,
          }}
        />
      )}
      {type === "date" && (
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <TextInput
            editable={false}
            placeholder="Choose Your Date of Birth"
            value={moment(selectedDate).format("DD/MM/YYYY")}
            className="border-2 rounded-md p-2"
            style={{
              borderColor: isFocused
                ? inputActiveBorderColor
                : inputBorderColor,
            }}
          />
          <DateTimePickerModal
            initialDate=""
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setSelectedDate(date);
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
