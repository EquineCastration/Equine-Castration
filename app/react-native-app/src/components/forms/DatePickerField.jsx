import { useStyle } from "contexts/StyleProvider";
import { useField } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { spacing, typography } from "style";
import { FieldView } from "./FieldView";
import { FormError } from "./FormError";

const DATE_FORMAT = "DD/MM/YYYY"; // standard date format the date is sent to the backend. Backend then parses it to the UTC date format
const DATE_DISPLAY_FORMAT = "Do MMMM YYYY"; // standard date format the date is displayed

/**
 * Date picker formik field component that allows users to select a date.
 * Expects value to be in either the format set in DATE_FORMAT or UTC. It is then formatted to the readable format set in DATE_DISPLAY_FORMAT.
 * However, the field value always remain in the DATE_FORMAT format.
 */
export const DatePickerField = ({
  label,
  labelAlign = "left",
  name,
  labelColor,
  placeholder = label,
  inputBorderColor,
}) => {
  const { colors: colorScheme } = useStyle();
  const [field, meta, helpers] = useField(name);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    helpers.setValue(moment(date).format(DATE_FORMAT)); // actual date format, which is then parsed to the UTC date format in the backend
    setIsDatePickerVisible(false);
  };

  useEffect(() => {
    // this is to handle the case when the UTC date, which we expect from the backend
    if (field.value) {
      const date = moment.utc(field.value);
      if (date.isValid()) {
        helpers.setValue(date.format(DATE_FORMAT));
      }
    }
  }, [field?.value]);

  return (
    <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
      <FieldView label={label} labelAlign={labelAlign} labelColor={labelColor}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            pointerEvents="none"
            editable={false}
            placeholder={placeholder}
            placeholderTextColor={colorScheme?.formOption}
            value={formatDate(field.value)}
            style={{
              flex: 1,
              borderBottomWidth: 1,
              padding: spacing.xs,
              borderBottomColor: inputBorderColor || colorScheme?.border,
              fontSize: 15,
              fontFamily: typography.primary.medium,
              color: colorScheme?.formLabel,
            }}
          />
          <DateTimePickerModal
            display="inline"
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setIsDatePickerVisible(false)}
          />
        </View>
        {meta.touched && meta.error ? <FormError error={meta.error} /> : null}
      </FieldView>
    </TouchableOpacity>
  );
};

/**
 * if date comes from the backend, then we expect it to be in the UTC date format
 * if date comes from the within, then we expect it to be in the standard date format
 * @param {string} value
 * @returns {string}
 * */
export const formatDate = (value) => {
  return value
    ? moment.utc(value, DATE_FORMAT).isValid()
      ? moment.utc(value, DATE_FORMAT).format(DATE_DISPLAY_FORMAT)
      : moment.utc(value).format(DATE_DISPLAY_FORMAT)
    : ""; // if null or undefined, return empty
};
