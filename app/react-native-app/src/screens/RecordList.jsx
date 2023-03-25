import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View } from "react-native";
import { db } from "../store/db";
import { BasicHeader } from "../components/BasicHeader";

export const RecordList = ({ navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM InititalConsultation",
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5">
        <BasicHeader
          primaryTxt="List of horses"
          secondaryTxt="Horses in the record"
        />
        <FlatList
          className="mt-4"
          data={data}
          renderItem={({ item }) => (
            <Text className="py-2 text-md border-b-2 border-gray-300">
              {item.horseName}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
