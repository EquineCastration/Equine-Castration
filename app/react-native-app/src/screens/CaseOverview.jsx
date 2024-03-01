import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors, font } from "style/style";
import { DefaultLayout } from "layout/DefaultLayout";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "contexts/User";

export const CaseOverview = ({ navigation, route }) => {
  const { caseData } = route.params;
  const { user } = useUser();

  return (
    <DefaultLayout>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        style={{
          marginTop: 15,
          marginHorizontal: 5,
          paddingHorizontal: 5,
        }}
        ListHeaderComponent={() => (
          <ListItem
            onPress={() =>
              navigation.navigate("CaseDetail", {
                caseData,
              })
            }
            marginBottom={12}
          >
            <Text style={[style.listLabel]}>
              <FontAwesome5 name="horse-head" size={18} /> View Case Detail
            </Text>
          </ListItem>
        )}
        ListFooterComponent={() => (
          <ListItem
            onPress={() =>
              navigation.navigate("CreateSurvey", {
                surveyType: "",
                // TODO: Will be based on the case discharge date. (1, 3, 5, 7 and so on.)
                // For e.g. if the case was discharged for more than 24 hours and less than 3 days, then the survey type will be "1".
              })
            }
            marginBottom={12}
          >
            <Text style={[style.listLabel]}>
              <FontAwesome name="wpforms" size={18} /> Post-surgery survey
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
              <FontAwesome5 name="clock" size={13} /> days/weeks/months
            </Text>
          </ListItem>
        )}
        data={[]} // TODO: Insert case survey data if available.
        renderItem={({ item }) => (
          <ListItem
            onPress={() =>
              navigation.navigate("CaseSurvey", {
                caseSurveyData: item,
              })
            }
          >
            <Text style={[style.listLabel]}>
              <FontAwesome name="wpforms" size={18} /> Survey title
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
              <FontAwesome5 name="calendar-alt" size={13} /> Survey completed
              date: {item.dateOfCastration}
            </Text>
          </ListItem>
        )}
      />
    </DefaultLayout>
  );
};

export const ListItem = ({ children, onPress, ...p }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: colors.primary[100],
          borderRadius: 10,
          backgroundColor: colors.ui.bg,
          padding: 15,
          ...p,
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
