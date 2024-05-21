import { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import { object, string } from "yup";

import { useUser } from "contexts/User";
import { useBackendApi } from "contexts/BackendApi";
import { AccountLayout } from "layout/AccountLayout";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { validationSchema as emailSchema } from "components/EmailField";
import { Spinner } from "components/Spinner";
import { Text } from "components/Text";
import { spacing } from "style";
import { useStyle } from "contexts/StyleProvider";
import { Button } from "components/Button";
import { InputField } from "components/forms";

const validationSchema = () =>
  object().shape({
    ...emailSchema("username"),
    password: string().required("Please enter a password"),
  });

export const AccountLogin = ({ navigation }) => {
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

  const { signIn } = useUser();
  const {
    account: { login, resendConfirm },
  } = useBackendApi();

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await login(values);
      signIn(data?.user);
    } catch (e) {
      const error = await e.response;
      switch (error?.status) {
        case 400: {
          const result = error.data;
          setFeedback({
            status: "error",
            message: result.isUnconfirmedAccount
              ? "Your account email address has not been confirmed."
              : "We couldn't log you in with the username and password you provided.",
            resendConfirm: result.isUnconfirmedAccount,
            resendConfirmUsername: values.username,
          });
          break;
        }
        default:
          setFeedback({
            status: "error",
            message: "An unknown error has occurred.",
          });
      }
    }
    setIsLoading(false);
  };

  const handleResendConfirm = async (username) => {
    setIsLoading(true);
    try {
      await resendConfirm(username);
      setFeedback({
        status: "success",
        message: "Account confirmation link sent",
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
      {isLoading ? <Spinner text="Signing in" /> : null}
      <AccountLayout
        primaryHeading="Welcome"
        secondaryHeading="Please sign in to continue"
      >
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema()}
          onSubmit={async (values) => await handleLoginSubmit(values)}
        >
          {({ handleSubmit }) => (
            <View style={{ gap: spacing.sm }}>
              <InputField
                name="username"
                label="Username/email"
                labelAlign="center"
                type="email"
              />

              <InputField
                name="password"
                label="Password"
                type="password"
                labelAlign="center"
              />

              <View style={{ alignItems: "center", gap: spacing.lg }}>
                {feedback?.resendConfirm && (
                  <Button
                    text="Request a new confirmation link"
                    style={{ padding: spacing.xxs }}
                    textStyle={{ fontSize: 10 }}
                    onPress={async () =>
                      await handleResendConfirm(feedback?.resendConfirmUsername)
                    }
                  />
                )}

                <TouchableOpacity
                  onPress={() => navigation.navigate("RequestPasswordReset")}
                >
                  <Text
                    style={{
                      color: colorScheme?.textLink,
                    }}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <Button
                  text="Sign In"
                  onPress={() => handleSubmit()}
                  preset="filled"
                  style={{
                    width: "60%",
                  }}
                />
              </View>

              <View
                style={{
                  margin: spacing.xs,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.sm,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: colorScheme?.tint }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegistrationStepOne")}
                >
                  <Text
                    style={{
                      color: colorScheme?.textLink,
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </AccountLayout>
    </>
  );
};
