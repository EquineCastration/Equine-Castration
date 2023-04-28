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
    helpers.setValue(date);
    setIsDatePickerVisible(false);
    console.log(moment(date).toISOString());
  };

  return (
    <TouchableOpacity
      style={{
        marginVertical: 8,
        backgroundColor: colors.ui.bg,
        paddingHorizontal: 8,
        borderRadius: 8,
      }}
      onPress={() => setIsDatePickerVisible(true)}
    >
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            marginVertical: 2,
            fontSize: font.size.normal,
            color: labelColor,
          }}
        >
          {label}
        </Text>
        <TextInput
          editable={false}
          placeholder={placeholder}
          value={field.value && moment(field.value).format("DD/MM/YYYY")}
          style={{
            backgroundColor: colors.light,
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            borderColor: inputBorderColor,
            marginVertical: 10,
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
