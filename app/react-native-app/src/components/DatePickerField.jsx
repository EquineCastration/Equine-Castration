import { useField } from "formik";
import { useState } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { colors, font } from "style/style";

export const DatePickerField = ({
  label,
  name,
  labelColor = colors.primary[700],
  placeholder = label,
  inputBorderColor = colors.primary[200],
}) => {
  const [field, meta, helpers] = useField(name);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    helpers.setValue(moment(date).format("DD/MM/YYYY"));
    setIsDatePickerVisible(false);
  };

  return (
    <TouchableOpacity
      style={{
        marginVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
      }}
      onPress={() => setIsDatePickerVisible(true)}
    >
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            marginVertical: 2,
            fontSize: font.size.md,
            color: labelColor,
          }}
        >
          {label}
        </Text>
        <TextInput
          editable={false}
          placeholder={placeholder}
          value={field.value}
          style={{
            backgroundColor: colors.light,
            borderBottomWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 5,
            paddingVertical: 12,
            borderBottomColor: inputBorderColor,
            fontSize: font.size.normal,
          }}
        />
        <DateTimePickerModal
          display="inline"
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setIsDatePickerVisible(false)}
        />
        {meta.touched && meta.error ? (
          <Text style={{ marginTop: 5, color: colors.error }}>
            {meta.error}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
