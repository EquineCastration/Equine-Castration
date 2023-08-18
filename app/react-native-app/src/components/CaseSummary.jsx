import { initialConsultation } from "constants/initial-consultation";
import { View, Text } from "react-native";
import { font } from "style/style";
import { colors } from "style/style";

export const CaseSummary = ({ data }) => {
  const fields = initialConsultation.fields;

  const formatValue = (field) => {
    let value = data[field].toString();

    Array.isArray(data[field]) && (value = `${data[field].join(", ")}`); // if array, join with comma
    typeof data[field] === "boolean" && (value = data[field] ? "Yes" : "No"); // if boolean, return Yes or No
    return value;
  };

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: colors.primary[75],
      }}
    >
      {Object.keys(data).map(
        (item, index) =>
          data[item]?.toString() && // if not empty string &&
          data[item] !== 0 && ( // if not 0
            <View
              key={index}
              style={{
                marginVertical: 2,
                paddingVertical: 10,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: colors.primary[100],
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 300,
                  fontSize: font.size.sm,
                  maxWidth: "65%",
                }}
              >
                {fields[item]?.label}
              </Text>
              <Text>-</Text>
              <Text
                style={{
                  fontWeight: 500,
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {formatValue(item)}
              </Text>
            </View>
          )
      )}
    </View>
  );
};
