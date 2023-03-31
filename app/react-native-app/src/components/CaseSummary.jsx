import { View, Text } from "react-native";
import { font } from "style/style";
import { InitialConsultationForm } from "store/store";
import { colors } from "style/style";

export const CaseSummary = ({ data }) => {
  const fields = InitialConsultationForm.fields;
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
              fontSize: font.size["normal"],
            }}
          >{`${fields[item]?.label} -`}</Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: font.size["normal"],
            }}
          >
            {data[item]}
          </Text>
        </View>
      ))}
    </View>
  );
};
