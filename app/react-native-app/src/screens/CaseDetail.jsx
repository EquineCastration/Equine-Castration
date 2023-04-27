import { DefaultLayout } from "layout/DefaultLayout";
import { CaseSummary } from "components/CaseSummary";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, font } from "style/style";

export const CaseDetail = ({ navigation, route }) => {
  const { caseData } = route.params;

  const MenuButton = ({
    iconName,
    title = "Menut button",
    color = colors.ui.btnBg,
    ...props
  }) => (
    <TouchableOpacity
      style={{
        marginVertical: 8,
        marginHorizontal: 5,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        borderWidth: 1,
        borderColor: color,
        color: color,
        borderRadius: 8,
        width: "20%",
      }}
      {...props}
    >
      <Ionicons name={iconName} size={18} color={color} />
      <Text
        style={{
          fontSize: font.size["xs"],
          fontWeight: 300,
          marginHorizontal: 10,
          color: color,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <DefaultLayout>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 5,
          gap: 5,
        }}
      >
        <MenuButton
          title="Edit"
          iconName="create-outline"
          color={colors.patra[900]}
          onPress={() =>
            navigation.navigate("EditInitialConsultation", {
              editData: caseData,
            })
          }
        />
        <MenuButton
          title="Delete"
          iconName="trash-outline"
          color={colors.error}
        />
      </View>
      <ScrollView
        style={{
          marginVertical: 2,
          marginHorizontal: 5,
          paddingHorizontal: 5,
        }}
      >
        <CaseSummary data={caseData} />
      </ScrollView>
    </DefaultLayout>
  );
};
