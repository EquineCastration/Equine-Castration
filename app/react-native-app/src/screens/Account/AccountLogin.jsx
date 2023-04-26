import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import { object, string } from "yup";

import { useUser } from "contexts/User";
import { useBackendApi } from "contexts/BackendApi";
import { colors, font } from "style/style";
import { AccountLayout } from "layout/AccountLayout";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { InputField } from "components/InputField";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { validationSchema as emailSchema } from "components/EmailField";
import { EmailField } from "components/EmailField";
import { Spinner } from "components/Spinner";

const validationSchema = () =>
  object().shape({
    ...emailSchema("username"),
    password: string().required("Please enter a password"),
  });

export const AccountLogin = ({ navigation }) => {
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
    account: { login },
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
            <View style={{ gap: 10 }}>
              <EmailField
                label="Username/email"
                name="username"
                labelAlign="center"
                bgColor={colors.light}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                labelAlign="center"
                bgColor={colors.light}
              />

              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: font.size["normal"],
                    color: colors.ui.btnBg,
                    fontWeight: 400,
                  }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <View style={{ alignItems: "center" }}>
                <BasicTouchableOpacity
                  title="Sign In"
                  btnWidth="60%"
                  paddingVertical={5}
                  onPress={() => handleSubmit()}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: font.size["normal"],
                    color: colors.primary[700],
                    fontWeight: 300,
                  }}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegistrationStepOne")}
                >
                  <Text
                    style={{
                      fontSize: font.size["md"],
                      color: colors.ui.btnBg,
                      fontWeight: 500,
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
