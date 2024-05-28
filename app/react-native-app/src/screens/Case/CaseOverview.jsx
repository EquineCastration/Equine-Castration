import { View, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import { useEligibleSurveyType, useSurveyList } from "api/survey";
import { Screen } from "components/Screen";
import { formatDate } from "components/forms/DatePickerField";
import { useStyle } from "contexts/StyleProvider";
import { Text } from "components/Text";
import { colors, spacing } from "style";
import { useUser } from "contexts/User";
import { permissions } from "constants/site-permissions";

export const CaseOverview = ({ navigation, route }) => {
  const { user } = useUser();
  const { caseData } = route.params;

  const { data: eligibleSurveyType } = useEligibleSurveyType(caseData.id);
  const { data: surveyList } = useSurveyList(caseData.id);

  const canCreateCaseSurveys = user?.permissions.includes(
    permissions.CreateCaseSurveys
  );

  return (
    <Screen>
      <View style={{ padding: spacing.md, gap: spacing.lg }}>
        <CaseDetail {...{ navigation, caseData }} />

        {canCreateCaseSurveys && eligibleSurveyType && (
          <EligibleSurveyType
            {...{ caseId: caseData.id, eligibleSurveyType, navigation }}
          />
        )}
        {surveyList?.map((caseSurveyData) => (
          <CaseSurvey
            key={caseSurveyData?.id}
            {...{ navigation, caseSurveyData }}
          />
        ))}
      </View>
    </Screen>
  );
};

const ListItem = ({ children, onPress, color, ...p }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderWidth: 1,
          borderColor: color,
          borderRadius: 8,
          padding: spacing.md,
          flexDirection: "row",
          alignItems: "center",
          ...p,
        }}
      >
        <View style={{ flex: 1 }}>{children}</View>
        <Ionicons name="arrow-forward-outline" size={20} color={color} />
      </View>
    </TouchableOpacity>
  );
};

const CaseDetail = ({ navigation, caseData }) => {
  const { colors: colorScheme } = useStyle();

  return (
    <ListItem
      onPress={() =>
        navigation.navigate("CaseDetail", {
          caseData,
        })
      }
      color={colorScheme?.textLink}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5
          name="horse-head"
          size={16}
          marginRight={spacing.xxs}
          color={colorScheme?.textLink}
        />
        <Text preset="label" style={{ color: colorScheme?.textLink }}>
          View Case Detail
        </Text>
      </View>
    </ListItem>
  );
};

/**
 * Only show this component if the user has the permission to create case surveys
 */
const EligibleSurveyType = ({
  caseId,
  eligibleSurveyType: { surveyType, postOpDays },
  navigation,
}) => {
  const { colors: colorScheme } = useStyle();
  return (
    <ListItem
      onPress={() =>
        navigation.navigate("SurveyForm", {
          caseId,
          surveyType,
        })
      }
      borderLeftWidth={spacing.xxs}
      color={colors.palette.rebelGold}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <SurveyTitleLabel
            surveyTypeName={surveyType?.name}
            color={colors.palette.rebelGold}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="clock"
              size={12}
              color={colorScheme?.text}
              marginRight={spacing.xxs}
            />
            <Text size="xs">Discharge days - {postOpDays}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
            marginRight: spacing.xxs,
          }}
        >
          <Text
            size="xs"
            weight="semiBold"
            style={{ color: colors.palette.rebelGold }}
          >
            Start Survey
          </Text>
        </View>
      </View>
    </ListItem>
  );
};

const CaseSurvey = ({ navigation, caseSurveyData }) => {
  const { colors: colorScheme } = useStyle();
  return (
    <ListItem
      onPress={() =>
        navigation.navigate("SurveyForm", {
          caseId: caseSurveyData?.caseId,
          surveyType: caseSurveyData?.surveyType,
          surveyData: caseSurveyData,
        })
      }
      borderLeftWidth={spacing.xxs}
      color={colors.palette?.forestGreen400}
    >
      <SurveyTitleLabel
        surveyTypeName={caseSurveyData?.surveyType?.name}
        color={colors.palette?.forestGreen400}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5
          name="calendar-day"
          size={12}
          color={colorScheme?.text}
          marginRight={spacing.xxs}
        />
        <Text size="xxs" weight="normal">
          {`Survey completion date: - ${formatDate(
            caseSurveyData?.surveyCompletion
          )}`}
        </Text>
      </View>
    </ListItem>
  );
};

const SurveyTitleLabel = ({ surveyTypeName, color }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <AntDesign name="form" size={16} color={color} marginRight={spacing.xs} />

    <Text preset="label" weight="semiBold" style={{ color }}>
      Survey - {surveyTypeName}
    </Text>
  </View>
);
