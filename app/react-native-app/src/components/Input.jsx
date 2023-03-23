import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import colors from "../configs/colors";
export const Input = ({
  label,
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <View className="mb-5">
      <Text className="my-2 text-xl" style={{ color: labelColor }}>
        {label}
      </Text>
      {type === "text" && (
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="border-2 rounded-md p-2"
          style={{
            borderColor: isFocused ? inputActiveBorderColor : inputBorderColor,
          }}
        />
      )}
      {type === "date" && (
        <>
          <Text
            className="text-xl font-light mb-2"
            onPress={() => setDatePickerVisible(true)}
          >
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : "No date selected"}
          </Text>
          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setSelectedDate(date);
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
          />
        </>
      )}
    </View>
  );
};
