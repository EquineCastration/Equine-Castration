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
        marginVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: colors.primary[75],
      }}
    >
      {Object.keys(data).map((item, index) => (
        <View
          key={index}
          style={{
            marginVertical: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: 300,
              fontSize: font.size.sm,
            }}
          >{`${fields[item]?.label} -`}</Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: font.size.sm,
            }}
          >
            {Array.isArray(data[item])
              ? `[${data[item].join(", ")}]`
              : data[item]}
          </Text>
        </View>
      ))}
    </View>
  );
};
