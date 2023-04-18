import { InputField } from "components/InputField";
import { DefaultLayout } from "layout/DefaultLayout";
import { Formik } from "formik";
import { View, Text, SafeAreaView } from "react-native";
import { colors, font } from "style/style";
import { BgGradient } from "components/BgGradient";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
export const AccountLogin = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: "35%",
          justifyContent: "center",
        }}
      >
        <BgGradient>
          <View style={{ alignItems: "center", marginBottom: 40, gap: 5 }}>
            <Text
              style={{
                fontSize: font.size["6xl"],
                fontWeight: 500,
                color: colors.light,
              }}
            >
              Login
            </Text>
            <Text
              style={{
                fontSize: font.size["lg"],
                color: colors.light,
              }}
            >
              Please sign in to continue
            </Text>
          </View>
        </BgGradient>
      </View>

      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values);
          // TODO: Handle submission
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 10,
            backgroundColor: colors.light,
            marginTop: -20,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <InputField
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

          <Text
            style={{
              textAlign: "center",
              fontSize: font.size["md"],
              color: colors.primary[800],
              fontWeight: 400,
            }}
          >
            Forgot password ?
          </Text>
          <View style={{ alignItems: "center" }}>
            <BasicTouchableOpacity
              title="Login"
              btnWidth="60%"
              paddingVertical={5}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: font.size["normal"],
              color: colors.primary[700],
              fontWeight: 300,
            }}
          >
            Don't have an account ?{" "}
            <Text
              style={{
                fontSize: font.size["md"],
                color: colors.ui.btnBg,
                fontWeight: 500,
              }}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </Formik>
    </SafeAreaView>
  );
};
