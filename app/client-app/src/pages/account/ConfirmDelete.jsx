import { Container, Text, VStack } from "@chakra-ui/react";
import { BusyPage } from "components/Busy";
import { TitledAlert } from "components/TitledAlert";
import { useBackendApi } from "contexts/BackendApi";
import { useQueryStringViewModel } from "helpers/hooks/useQueryStringViewModel";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ErrorFeedback = ({ tKey }) => {
  const { t } = useTranslation();
  return (
    <Container my={16}>
      <VStack spacing={4}>
        <TitledAlert status="error" title={t("feedback.error_title")}>
          <Text>{t(tKey ?? "confirmAccountDelete.feedback.error")}</Text>
        </TitledAlert>
      </VStack>
    </Container>
  );
};

const useConfirmDelete = (userId, token) => {
  const {
    account: { confirmDelete },
  } = useBackendApi();
  const [status, setStatus] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const handleConfirm = async () => {
      try {
        const response = await confirmDelete(userId, token);
        setStatus(response.status);
      } catch (e) {
        setError(e);
      }
    };

    if (userId && token) {
      handleConfirm();
    }
  }, [userId, token, confirmDelete]);

  return { status, error };
};

export const ConfirmDelete = () => {
  const { userId, token } = useQueryStringViewModel();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { status, error } = useConfirmDelete(userId, token);

  useEffect(() => {
    if (status === 204 || status === 200) {
      navigate("/", {
        state: {
          toast: {
            title: t("confirmAccountDelete.feedback.success"),
            status: "success",
            duration: 2500,
            isClosable: true,
          },
        },
      });
    }
  }, [status, navigate, t]);

  let tKey;
  if (error) {
    switch (error?.response?.status) {
      case 400:
      case 404:
        tKey = "confirmAccountDelete.feedback.invalidLink";
        break;
      default:
        tKey = "confirmAccountDelete.feedback.error";
    }
  }

  return (
    <Suspense
      fallback={
        <BusyPage
          tKey="confirm.feedback.busy"
          containerProps={{ justifyContent: "center" }}
        />
      }
    >
      {tKey ? <ErrorFeedback tKey={tKey} /> : null}
    </Suspense>
  );
};
