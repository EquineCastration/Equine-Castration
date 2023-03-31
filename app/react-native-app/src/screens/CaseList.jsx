import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors, font } from "style/style";
import { queryBase } from "db/queries/base";
import { DefaultLayout } from "layout/DefaultLayout";

export const CaseList = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    queryBase.getData("InitialConsultation", setData);
  }, []);

  return (
    <DefaultLayout primaryTxt="Case list" secondaryTxt="List of cases">
      <FlatList
        style={{
          marginTop: 15,
        }}
        data={data}
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              navigation.navigate("CaseDetail", {
                caseData: item,
              })
            }
            data={data}
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
          </ListItem>
        )}
      />
    </DefaultLayout>
  );
};

export const ListItem = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors.primary[100],
          borderRadius: 5,
          backgroundColor: colors.primary[75],
          padding: 10,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  listLabel: { color: colors.primary[700], fontSize: font.size["lg"] },
});
