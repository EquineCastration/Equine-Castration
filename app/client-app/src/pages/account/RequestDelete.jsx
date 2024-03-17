import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import { useResetState } from "helpers/hooks/useResetState";
import { useBackendApi } from "contexts/BackendApi";
import { EmailField } from "components/forms/EmailField";
import { useScrollIntoView } from "helpers/hooks/useScrollIntoView";

const validationSchema = (t) =>
  object().shape({
    email: string()
      .email(t("validation.email_valid"))
      .required(t("validation.email_required")),
  });

export const RequestDelete = () => {
  const { key } = useLocation();
  const { t } = useTranslation();
  const {
    account: { requestAccountDelete },
  } = useBackendApi();

  // ajax submissions may cause feedback to display
  // but we reset feedback if the page should remount
  const [feedback, setFeedback] = useResetState([key]);

  const [scrollTarget, scrollTargetIntoView] = useScrollIntoView({
    behavior: "smooth",
  });

  const handleSubmit = async ({ email }, actions) => {
    // If submission was triggered by hitting Enter,
    // we should blur the focused input
    // so we don't mess up validation when we reset after submission
    if (document?.activeElement) document.activeElement.blur();

    try {
      await requestAccountDelete(email);

      setFeedback({
        status: "success",
        message: t("requestAccountDelete.feedback.success"),
      });

      // when we reset, untouch fields so that clicking away from an input
      // that we are emptying doesn't (in)validate that now empty input
      actions.resetForm({ touched: [] });
    } catch (e) {
      setFeedback({
        status: "error",
        message: t("feedback.error"),
      });
    }

    scrollTargetIntoView();

    actions.setSubmitting(false);
  };

  return (
    <Container ref={scrollTarget} key={key} my={8}>
      <VStack align="stretch" spacing={4}>
        <Heading as="h2" size="lg">
          {t("requestAccountDelete.heading")}
        </Heading>

        {feedback?.status && (
          <Alert status={feedback.status}>
            <AlertIcon />
            {feedback.message}
          </Alert>
        )}

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema(t)}
        >
          {({ isSubmitting, isValid }) => (
            <Form noValidate>
              <VStack align="stretch" spacing={4}>
                <EmailField hasCheckReminder autoFocus />

                <HStack justify="space-between">
                  <Button
                    w="200px"
                    colorScheme="red"
                    leftIcon={<FaTrash />}
                    type="submit"
                    disabled={isSubmitting || !isValid} // disable if form is not valid
                    isLoading={isSubmitting}
                  >
                    {t("requestAccountDelete.buttons.submit")}
                  </Button>
                </HStack>
              </VStack>
            </Form>
          )}
        </Formik>
      </VStack>
    </Container>
  );
};
