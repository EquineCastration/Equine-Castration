import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

import { Formik } from "formik";
import { object, string } from "yup";

import { InputField } from "components/InputField";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { colors, font } from "style/style";
import { validationSchema as emailSchema } from "components/EmailField";
import { AccountLayout } from "./AccountLayout";
import { EmailField } from "components/EmailField";

const validationSchema = () =>
  object().shape({
    ...emailSchema("username"),
    password: string().required("Please enter a password"),
  });

export const AccountLogin = ({ navigation }) => {
  return (
    <AccountLayout
      primaryHeading="Welcome"
      secondaryHeading="Please sign into continue"
    >
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema()}
        onSubmit={async (values) => {
          console.log(values);
          // TODO: Handle submission
        }}
      >
        {({ handleSubmit, values }) => (
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
                Forgot password ?
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
                Don't have an account ?
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
  );
};
