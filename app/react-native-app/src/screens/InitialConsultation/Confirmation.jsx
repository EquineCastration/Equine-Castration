import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useBackendApi } from "contexts/BackendApi";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  initialConsultationStore as store,
  resetInitialConsultationStore,
} from "store/InitialConsultationStore";
import { CaseSummary } from "components/CaseSummary";
import { Spinner } from "components/Spinner";
import { Layout } from "./Layout";

export const Confirmation = ({ navigation }) => {
  const data = store.useState();
  const isEditing = data.id ?? false;
  const [feedback, setFeedback] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    case: { create, edit },
  } = useBackendApi();

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const confirmAlert = () =>
    Alert.alert(
      `Confirm ${isEditing ? "Edit" : "Create"}`,
      `Would you like to ${isEditing ? "edit a" : "create a new"} case ?`,
      [
        {
          text: "Cancel",
          style: "cancel", // only applicable to ios
        },
        { text: "OK", onPress: () => handleInitialConsultationSubmit() },
      ]
    );

  const handleInitialConsultationSubmit = async () => {
    setIsLoading(true);
    try {
      isEditing
        ? await edit(data, data.id) // edit case if id exists
        : await create(data); // create case if id does not exist
      setFeedback({
        status: "success",
        message: `Case ${isEditing ? "updated" : "created"} successfully!`,
      });
      resetInitialConsultationStore();
      navigation.reset({
        index: 0,
        routes: [{ name: isEditing ? "CaseList" : "Home" }],
      });
    } catch (e) {
      const error = await e.response;
      switch (error?.status) {
        case 400: {
          let message =
            "There was an issue with your form submission. Please check for errors and try again.";
          setFeedback({ status: "error", message });
          break;
        }
        default:
          setFeedback({
            status: "error",
            message: "An unknown error has occurred.",
          });
      }
      // TODO:
      // Store the data onto the Async Storage if we cannot upload straightaway
      // Might need to create a screen that displays data pending upload
      // Run a background service to start uploading as soon as Backend is reachable
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner text={isEditing ? "Updating " : "Creating new case."} />
      ) : null}
      <Layout onSubmit={confirmAlert} current={9} buttonTitle="Confirm">
        <CaseSummary data={data} />
      </Layout>
    </>
  );
};
