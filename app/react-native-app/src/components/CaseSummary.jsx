import { initialConsultation } from "constants/initial-consultation";
import { View, Text } from "react-native";
import { font } from "style/style";
import { colors } from "style/style";

export const CaseSummary = ({ data }) => {
  const fields = initialConsultation.fields;
  return (
    <View
      style={{
        flex: 1,
        marginVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: colors.ui.bg,
      }}
    >
      {Object.keys(data).map((item, index) => (
        <View
          key={index}
          style={{
            marginVertical: 2,
            paddingVertical: 10,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: colors.primary[100],
          }}
        >
          <Text
            style={{
              fontWeight: 300,
              fontSize: font.size.sm,
            }}
          >
            {`${fields[item]?.label} -`}{" "}
            <Text
              style={{
                fontWeight: 500,
              }}
            >
              {Array.isArray(data[item])
                ? `[${data[item].join(", ")}]`
                : data[item]}
            </Text>
          </Text>
        </View>
      ))}
    </View>
  );
};
