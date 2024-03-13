import { DefaultLayout } from "layout/DefaultLayout";
import { CaseSummary } from "components/CaseSummary";
import { ActionButton } from "components/ActionButton";
import { Spinner } from "components/Spinner";
import { ScrollView, View, Alert } from "react-native";
import { useState, useEffect } from "react";
import { colors } from "style/style";
import { useUser } from "contexts/User";
import { useBackendApi } from "contexts/BackendApi";
import { permissions } from "constants/site-permissions";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const CaseDetail = ({ navigation, route }) => {
  const { caseData } = route.params;
  const [feedback, setFeedback] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useUser();
  const {
    case: { delete: remove },
  } = useBackendApi();

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const deleteAlert = () =>
    Alert.alert(
      "Delete confirmation",
      "Are you sure you want to delete the case?",
      [
        {
          text: "Cancel",
          style: "cancel", // only applicable to ios
        },
        { text: "OK", onPress: () => handleDelete(caseData.id) },
      ]
    );

  const handleDelete = async (caseId) => {
    setIsDeleting(true);
    try {
      await remove(caseId);
      setFeedback({
        status: "success",
        message: `Case id -${caseId} removed successfully!`,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "CaseList" }],
      });
    } catch (e) {
      const error = await e.response;
      switch (error?.status) {
        default:
          setFeedback({
            status: "error",
            message: "An unknown error has occurred.",
          });
      }
    }
    setIsDeleting(false);
  };

  // permissions
  const canDelete = user.permissions.some((permission) =>
    [permissions.DeleteOwnCases].includes(permission)
  );

  const canEdit = user.permissions.some((permission) =>
    [permissions.EditOwnCases].includes(permission)
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
    <>
      {isDeleting ? <Spinner text="Deleting case" /> : null}
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
              onPress={deleteAlert}
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
    </>
  );
};
