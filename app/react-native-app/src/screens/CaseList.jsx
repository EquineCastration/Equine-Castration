import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors, font } from "style/style";
import { DefaultLayout } from "layout/DefaultLayout";
import { useCaseList } from "api/case";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

export const CaseList = ({ navigation }) => {
  const { data: caseList, mutate } = useCaseList();
  const isFocused = useIsFocused(); // is screen focussed
  const [data, setData] = useState();

  useEffect(() => {
    // TODO:
    // Store the loaded data onto the Async Storage
    // Before apending the Async storage, always check if we are able to fetch data from Backend
    // If we are not getting any data, then donot append
    // This is useful during offline mode
    isFocused && mutate();
  }, [isFocused]);

  return (
    <DefaultLayout>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        style={{
          marginTop: 15,
          marginHorizontal: 5,
          paddingHorizontal: 5,
        }}
        data={caseList}
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              navigation.navigate("CaseDetail", {
                caseData: item,
              })
            }
            data={caseList}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
              Castration date:{" "}
              {moment(item.dateOfCastration).format("DD/MM/YYYY")}
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
          borderBottomWidth: 2,
          borderColor: colors.primary[100],
          borderRadius: 10,
          backgroundColor: colors.ui.bg,
          padding: 15,
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
