import { View, SafeAreaView, Text } from "react-native";
import { BgGradient } from "components/BgGradient";
import { colors, font } from "style/style";
import { BasicBackButton } from "components/BasicBackButton";

export const AccountLayout = ({
  children,
  headerViewHeight = "35%",
  primaryHeading = "Heading 1",
  secondaryHeading = "Headin 2",
  backBtn,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: headerViewHeight,
          justifyContent: "center",
        }}
      >
        <BgGradient>
          {backBtn && (
            <View style={{ position: "absolute", top: 50, left: 20 }}>
              <BasicBackButton color={colors.light} />
            </View>
          )}
          <View style={{ alignItems: "center", marginBottom: 40, gap: 5 }}>
            <Text
              style={{
                fontSize: font.size["6xl"],
                fontWeight: 500,
                color: colors.light,
              }}
            >
              {primaryHeading}
            </Text>
            <Text
              style={{
                fontSize: font.size["lg"],
                color: colors.light,
              }}
            >
              {secondaryHeading}
            </Text>
          </View>
        </BgGradient>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.light,
          marginTop: -20,
          padding: 10,
          borderRadius: 20,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
