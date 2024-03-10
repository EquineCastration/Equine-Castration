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
import { useEligibleSurveyType, useSurveyList } from "api/survey";

export const CaseOverview = ({ navigation, route }) => {
  const { caseData } = route.params;

  const { data: eligibleSurveyType } = useEligibleSurveyType(caseData.id);
  const { data: surveyList } = useSurveyList(caseData.id);

  return (
    <DefaultLayout>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        style={{
          marginTop: 15,
          marginHorizontal: 5,
          paddingHorizontal: 5,
        }}
        ListHeaderComponent={<CaseDetail {...{ navigation, caseData }} />}
        ListFooterComponent={() =>
          eligibleSurveyType && (
            <EligibleSurveyType
              {...{ eligibleSurveyType, navigation, caseId: caseData.id }}
            />
          )
        }
        data={surveyList}
        renderItem={({ item }) => (
          <CaseSurvey {...{ navigation, caseSurveyData: item }} />
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
          marginBottom: 12,
          ...p,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const EligibleSurveyType = ({
  caseId,
  eligibleSurveyType: { surveyType, postOpDays },
  navigation,
}) => (
  <ListItem
    onPress={() =>
      navigation.navigate("SurveyForm", {
        caseId,
        surveyType, // { id, name }
      })
    }
    borderLeftWidth={5}
    borderColor={colors.kanaka[600]}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name="wpforms"
            size={18}
            color={colors.primary[600]}
            marginRight={4}
          />

          <Text style={style.listLabel}>{surveyType?.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="clock" size={13} marginRight={4} />
          <Text
            style={[
              style.listLabel,
              {
                fontSize: font.size["sm"],
              },
            ]}
          >
            Discharge days - {postOpDays}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text
          style={[
            style.listLabel,
            {
              fontSize: font.size["sm"],
              fontWeight: 500,
            },
          ]}
        >
          Start Survey
        </Text>
        <FontAwesome5
          name="arrow-right"
          size={18}
          color={colors.primary[600]}
          marginLeft={8}
        />
      </View>
    </View>
  </ListItem>
);

const CaseDetail = ({ navigation, caseData }) => (
  <ListItem
    onPress={() =>
      navigation.navigate("CaseDetail", {
        caseData,
      })
    }
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome5
        name="horse-head"
        size={18}
        marginRight={6}
        color={colors.primary[700]}
      />
      <Text style={[style.listLabel]}>View Case Detail</Text>
    </View>
  </ListItem>
);

const CaseSurvey = ({ navigation, caseSurveyData }) => (
  <ListItem
    onPress={() =>
      navigation.navigate("SurveyForm", {
        caseId: caseSurveyData?.caseId,
        surveyType: caseSurveyData?.surveyType,
        surveyData: caseSurveyData,
      })
    }
    borderLeftWidth={5}
    borderColor={colors.patra[600]}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome
        name="wpforms"
        size={18}
        color={colors.primary[600]}
        marginRight={4}
      />

      <Text style={style.listLabel}>
        Survey - {caseSurveyData?.surveyType?.name}
      </Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome5
        name="calendar-day"
        size={14}
        color={colors.primary[600]}
        marginRight={4}
      />
      <Text
        style={[
          style.listLabel,
          {
            fontSize: font.size["sm"],
          },
        ]}
      >
        Survey completion date: - {caseSurveyData?.surveyCompletion}
      </Text>
    </View>
  </ListItem>
);

const style = StyleSheet.create({
  listLabel: { color: colors.primary[700], fontSize: font.size["lg"] },
});
