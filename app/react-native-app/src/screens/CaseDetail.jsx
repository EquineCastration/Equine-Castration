import { DefaultLayout } from "layout/DefaultLayout";
import { CaseSummary } from "components/CaseSummary";
import { ScrollView, View } from "react-native";
import { colors } from "style/style";
import { useUser } from "contexts/User";
import { permissions } from "constants/site-permissions";
import { useBackendApi } from "contexts/BackendApi";
import { ActionButton } from "components/ActionButton";

export const CaseDetail = ({ navigation, route }) => {
  const { caseData } = route.params;
  const { user } = useUser();
  const {
    case: { delete: remove },
  } = useBackendApi();

  const handleDelete = async (caseId) => {
    try {
      await remove(caseId);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const canDelete = user.permissions.some((permission) =>
    [permissions.DeleteAllCases, permissions.DeleteOwnCases].includes(
      permission
    )
  );

  const canEdit = user.permissions.some((permission) =>
    [permissions.EditAllCases, permissions.EditOwnCases].includes(permission)
  );

  const ButtonAction = ({ title, iconName, color, onPress }) => (
    <ActionButton
      title={title}
      iconName={iconName}
      color={color}
      onPress={onPress}
      gap={5}
      marginVertical={8}
      marginHorizontal={5}
      paddingVertical={5}
    />
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
        {canEdit && (
          <ButtonAction
            title="Edit"
            iconName="create-outline"
            color={colors.patra[900]}
            onPress={() =>
              navigation.navigate("EditInitialConsultation", {
                editData: caseData,
              })
            }
          />
        )}

        {canDelete && (
          <ButtonAction
            title="Delete"
            iconName="trash-outline"
            color={colors.error}
            onPress={() => handleDelete(caseData.id)}
          />
        )}
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
