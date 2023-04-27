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
    case: { create },
  } = useBackendApi();

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const handleInitialConsultationSubmit = async (navigation, data) => {
    setIsLoading(true);
    try {
      await create(data);
      setFeedback({
        status: "success",
        message: "Case created successfully!",
      });
      InitialConsultationStore.replace(ICStoreInitialState);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
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
      {isLoading ? <Spinner text="Creating new case." /> : null}
      <Layout
        onSubmit={() => handleInitialConsultationSubmit(navigation, data)}
        current={7}
        title="Confirm"
      >
        <CaseSummary data={data} />
      </Layout>
    </>
  );
};
