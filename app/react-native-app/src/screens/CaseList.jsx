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
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

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
              navigation.navigate("CaseOverview", {
                caseData: item,
              })
            }
          >
            <Text style={[style.listLabel]}>
              <FontAwesome5 name="horse-head" size={18} /> {item.horseName}
            </Text>

            <Text
              style={[
                style.listLabel,
                {
                  fontSize: font.size["sm"],
                  marginVertical: 3,
                },
              ]}
            >
              <FontAwesome5 name="calendar-alt" size={13} /> Castration date:{" "}
              {item.dateOfCastration}
            </Text>
            <Text
              style={[
                style.listLabel,
                {
                  fontWeight: "300",
                  fontStyle: "italic",
                  fontSize: font.size["sm"],
                  textAlign: "right",
                },
              ]}
            >
              <FontAwesome5 name="user-alt" size={13} /> Owner:{" "}
              {item.clientSurname}
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
