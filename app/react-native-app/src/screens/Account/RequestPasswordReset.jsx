import { useState, useEffect } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { object } from "yup";
import { useBackendApi } from "contexts/BackendApi";
import { AccountLayout } from "layout/AccountLayout";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Button } from "components/Button";
import { validationSchema as emailSchema } from "components/forms/EmailField";
import { EmailField } from "components/forms";
import { Spinner } from "components/Spinner";
import { spacing } from "style";
import { useStyle } from "contexts/StyleProvider";

const validationSchema = object().shape({
  ...emailSchema("email"),
});

export const RequestPasswordReset = () => {
  const { colors: colorScheme } = useStyle();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const {
    account: { requestPasswordReset },
  } = useBackendApi();

  const handlePwdResetRequest = async ({ email }) => {
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setFeedback({
        status: "success",
        message:
          "If there is an user account associated with that email address, we'll send an email with instructions on how to reset your password.",
      });
    } catch (e) {
      setFeedback({
        status: "error",
        message: "An unknown error has occurred.",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <Spinner text="Requesting Password reset" /> : null}
      <AccountLayout
        primaryHeading="Password Reset"
        secondaryHeading=""
        backBtn
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => await handlePwdResetRequest(values)}
        >
          {({ handleSubmit }) => (
            <View style={{ gap: spacing.xs }}>
              <EmailField
                label="Email"
                name="email"
                labelAlign="center"
                bgColor={colorScheme?.background}
              />

              <View style={{ alignItems: "center" }}>
                <Button
                  preset="filled"
                  text="Send me a reset link"
                  textStyle={{ textTransform: "none", fontSize: 16 }}
                  style={{ paddingVertical: spacing.md }}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </AccountLayout>
    </>
  );
};
