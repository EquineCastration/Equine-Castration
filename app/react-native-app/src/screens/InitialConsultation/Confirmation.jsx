import {
  InitialConsultationStore,
  ICStoreInitialState,
} from "store/InitialConsultationStore";
import { Layout } from "./InitialConsultationStepOne";
import { CaseSummary } from "components/CaseSummary";
import { useBackendApi } from "contexts/BackendApi";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Spinner } from "components/Spinner";

export const Confirmation = ({ navigation }) => {
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

  const handleInitialConsultationSubmit = async (data) => {
    setIsLoading(true);
    try {
      data.id
        ? await edit(data, data.id) // edit case if id exists
        : await create(data); // create case if id does not exist
      setFeedback({
        status: "success",
        message: `Case ${data.id ? "updated" : "created"} successfully!`,
      });
      InitialConsultationStore.replace(ICStoreInitialState);
      navigation.reset({
        index: 0,
        routes: [{ name: data.id ? "CaseList" : "UserHome" }],
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

  const data = InitialConsultationStore.useState();

  return (
    <>
      {isLoading ? (
        <Spinner text={data.id ? "Updating " : "Creating new case."} />
      ) : null}
      <Layout
        onSubmit={() => handleInitialConsultationSubmit(data)}
        current={7}
        title="Confirm"
      >
        <CaseSummary data={data} />
      </Layout>
    </>
  );
};
