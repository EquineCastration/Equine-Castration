import { useState, useEffect } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { object } from "yup";
import { useBackendApi } from "contexts/BackendApi";
import { colors } from "style/style";
import { AccountLayout } from "layout/AccountLayout";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { validationSchema as emailSchema } from "components/EmailField";
import { EmailField } from "components/EmailField";
import { Spinner } from "components/Spinner";

const validationSchema = object().shape({
  ...emailSchema("email"),
});

export const RequestPasswordReset = () => {
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
    console.log("email", email);
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setFeedback({
        status: "success",
        message:
          "If there is an user account associated with that email address, we'll send an email with instructions on how to reset your password.",
      });
    } catch (e) {
      console.error(e);
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
            <View style={{ gap: 10 }}>
              <EmailField
                label="Email"
                name="email"
                labelAlign="center"
                bgColor={colors.light}
              />

              <View style={{ alignItems: "center" }}>
                <BasicTouchableOpacity
                  title="Send me a reset link"
                  btnWidth="60%"
                  paddingVertical={10}
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
