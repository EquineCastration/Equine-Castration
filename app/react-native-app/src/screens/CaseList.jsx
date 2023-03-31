import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet } from "react-native";
import { BasicHeader } from "components/BasicHeader";
import { colors, font } from "style/style";
import { queryBase } from "db/queries/base";

export const CaseList = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    queryBase.getData("InitialConsultation", setData);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <BasicHeader primaryTxt="Case list" secondaryTxt="List of cases" />
        <FlatList
          style={{
            marginTop: 15,
          }}
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: colors.primary[100],
                borderRadius: 5,
                backgroundColor: colors.primary[75],
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[style.listLabel, { flex: 1 }]}>
                  {item.horseName}
                </Text>
                <Text
                  style={[
                    style.listLabel,
                    {
                      fontWeight: "300",
                      fontStyle: "italic",
                      fontSize: font.size["sm"],
                    },
                  ]}
                >
                  Owner: {item.clientSurname}
                </Text>
              </View>
              <Text
                style={[
                  style.listLabel,
                  {
                    fontSize: font.size["sm"],
                  },
                ]}
              >
                Castration date: {item.dateOfCastration}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  listLabel: { color: colors.primary[700], fontSize: font.size["lg"] },
});
