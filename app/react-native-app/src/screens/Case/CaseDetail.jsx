import { DefaultLayout } from "layout/DefaultLayout";
import { CaseSummary } from "components/CaseSummary";
import { Spinner } from "components/Spinner";
import { ScrollView, View, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "contexts/User";
import { useBackendApi } from "contexts/BackendApi";
import { permissions } from "constants/site-permissions";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { spacing, colors } from "style";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "components/Button";

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
    <Button
      text={title}
      textStyle={{
        color,
        fontSize: 10,
        textTransform: "capitalize",
      }}
      style={{
        flexDirection: "column",
        borderColor: color,
        paddingVertical: spacing.xxs,
        marginVertical: spacing.xs,
        marginHorizontal: spacing.xxs,
        width: "20%",
      }}
      onPress={onPress}
      LeftAccessory={() => <Ionicons name={iconName} size={20} color={color} />}
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
            margin: spacing.xxs,
            gap: spacing.xxs,
          }}
        >
          {canEdit && (
            <ButtonAction
              title="Edit"
              iconName="create-outline"
              color={colors.palette.forestGreen}
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
              color={colors.danger}
              onPress={deleteAlert}
            />
          )}
        </View>
        <ScrollView
          style={{
            marginVertical: spacing.xxs,
            marginHorizontal: spacing.xxs,
            paddingHorizontal: spacing.xxs,
          }}
        >
          <CaseSummary data={caseData} />
        </ScrollView>
      </DefaultLayout>
    </>
  );
};
