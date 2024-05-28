import { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import { DefaultLayout } from "layout/DefaultLayout";
import { useCaseList } from "api/case";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatDate } from "components/forms/DatePickerField";
import { useStyle } from "contexts/StyleProvider";
import { spacing } from "style";
import { Text } from "components/Text";

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
          marginTop: spacing.md,
          paddingHorizontal: spacing.sm,
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
            <Text preset="label">
              <FontAwesome5 name="horse-head" size={16} /> {item.horse.name}
            </Text>

            <Text>
              <FontAwesome5 name="calendar-alt" size={16} /> Castration date:{" "}
              {formatDate(item.horse.dateOfCastration)}
            </Text>
            <Text
              weight="normal"
              size="xs"
              style={{
                textAlign: "right",
              }}
            >
              <FontAwesome5 name="user-alt" size={16} /> Owner:{" "}
              {item.clientEmail}
            </Text>
          </ListItem>
        )}
      />
    </DefaultLayout>
  );
};

export const ListItem = ({ children, onPress }) => {
  const { colors: colorScheme } = useStyle();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderWidth: 1,
          borderColor: colorScheme?.textLink,
          borderRadius: 8,
          padding: spacing.sm,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
