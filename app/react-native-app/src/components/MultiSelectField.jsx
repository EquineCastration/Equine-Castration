import { useField } from "formik";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { colors, font } from "style/style";
import { useState } from "react";

export const MultiSelectField = ({
  isMulti = true,
  name,
  items,
  label,
  labelColor = colors.primary[700],
  borderColor = colors.primary[200],
}) => {
  const [field, meta, helpers] = useField(name);
  const [selected, setSelected] = useState(field.value);

  const handleChange = (value) => {
    setSelected(value);
    helpers.setValue(value);
  };

  return (
    <View
      style={{
        marginVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
      }}
    >
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            marginBottom: 5,
            fontSize: font.size.md,
            color: labelColor,
          }}
        >
          {label}
        </Text>

        <View
          style={{
            marginVertical: 5,
            flex: 1,
          }}
        >
          <SectionedMultiSelect
            single={!isMulti}
            items={items}
            IconRenderer={Icon}
            uniqueKey="id"
            selectText={`${label} . . .`}
            searchPlaceholderText={`Search ${label} . . .`}
            onSelectedItemsChange={handleChange}
            selectedItems={selected}
            colors={{
              primary: colors.ui.btnBg,
              text: labelColor,
            }}
            styles={{
              itemText: {
                fontSize: font.size.normal,
                fontWeight: "normal",
              },
              modalWrapper: {
                justifyContent: "center",
              },
              container: {
                maxHeight: 300,
              },
              separator: {
                marginVertical: 3,
              },
              selectToggle: {
                padding: 5,
                borderWidth: 1,
                borderColor: borderColor,
                borderRadius: 8,
              },
              chipsWrapper: {
                marginTop: 8,
              },
              chipContainer: {
                margin: 5,
                borderRadius: 12,
              },
            }}
          />
        </View>
        {meta.touched && meta.error ? (
          <Text style={{ marginTop: 5, color: colors.error }}>
            {meta.error}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
