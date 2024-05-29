import { View, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Button } from "components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useStyle } from "contexts/StyleProvider";
import { Text } from "components/Text";
import { spacing } from "style";

const LOGO_URL = "../../assets/eq_logo.jpg";

export const AccountLayout = ({
  children,
  headerViewHeight = "35%",
  primaryHeading = "Heading 1",
  secondaryHeading = "Headin 2",
  backBtn,
}) => {
  const { colors: colorScheme } = useStyle();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colorScheme?.background,
      }}
    >
      <View
        style={{
          height: headerViewHeight,
          justifyContent: "flex-end",
        }}
      >
        {backBtn && (
          <View style={{ position: "absolute", top: 50, left: 20, zIndex: 1 }}>
            <Button
              preset="ghost"
              onPress={() => navigation.goBack()}
              LeftAccessory={() => (
                <Ionicons
                  name="arrow-back-outline"
                  size={20}
                  color={colorScheme?.text}
                />
              )}
            />
          </View>
        )}
        <View
          style={{
            alignItems: "center",
            gap: spacing.xx,
          }}
        >
          <Image
            source={require(LOGO_URL)}
            style={{ width: 100, height: 100, marginBottom: spacing.sm }}
          />

          <Text
            size="xxl"
            weight="bold"
            style={{
              color: colorScheme?.textLink,
            }}
          >
            {primaryHeading}
          </Text>
          <Text
            size="lg"
            weight="medium"
            style={{
              color: colorScheme?.textLink,
            }}
          >
            {secondaryHeading}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: spacing.md,
        }}
      >
        <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
