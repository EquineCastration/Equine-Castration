import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View } from "react-native";
import { db } from "db/db";
import { BasicHeader } from "components/BasicHeader";
import { colors, font } from "style/style";

export const RecordList = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM InitialConsultation",
        [],
        (_, result) => {
          setData(result.rows._array);
        },
        (_, error) => {
          console.log("Error during select operation:", error);
        }
      );
    });
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
        <BasicHeader
          primaryTxt="List of horses"
          secondaryTxt="Horses in the record"
        />
        <FlatList
          style={{
            marginTop: 10,
          }}
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.primary[200],
              }}
            >
              <Text
                style={{
                  color: colors.primary[700],
                  paddingVertical: 10,
                  fontSize: font.size["sm"],
                }}
              >
                {item.horseName}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
