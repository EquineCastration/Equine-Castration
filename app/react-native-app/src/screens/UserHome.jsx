import { Button } from "components/Button";
import { SafeAreaView, View } from "react-native";
import { resetInitialConsultationStore } from "store/InitialConsultationStore";
import { useUser } from "contexts/User";
import { permissions } from "constants/site-permissions";
import { useStyle } from "contexts/StyleProvider";
import { colors } from "style";
import { spacing } from "style";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "components/Text";

export const UserHome = ({ navigation }) => {
  // should be loaded as screen to get navigation prop
  const { colors: colorScheme } = useStyle();
  const { user } = useUser();

  const initialsOptions = [
    {
      title: "Create Case",
      navigateToParent: "InitialConsultation",
      navigate: "InitialConsultationStepOne", // screen name
      icon: "create-outline", // only accepts ionicons
      bgColor: colors.palette.trentTurquoise,
      visible: user?.permissions.includes(permissions.CreateCases),
    },
    {
      title: "View Cases",
      navigateToParent: "Cases",
      navigate: "CaseList", // screen name
      icon: "documents-outline", // only accepts ionicons
      bgColor: colors.palette.forestGreen,
      visible: user?.permissions.includes(permissions.ListOwnCases),
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorScheme?.background,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingVertical: spacing.sm,
          justifyContent: "center",
          paddingHorizontal: spacing.md,
        }}
      >
        <View style={{ height: "20%", justifyContent: "center" }}>
          <Text size="xxl" weight="semiBold">
            <Ionicons
              name={currentGreeting().icon}
              size={28}
              color={colorScheme?.text}
            />
            {` ${currentGreeting().text}`}
          </Text>
          <Text size="xl" weight="medium">
            {user.fullName}
          </Text>
        </View>

        <View
          style={{
            gap: spacing.sm,
          }}
        >
          {initialsOptions &&
            initialsOptions.map((option, index) => {
              return (
                option.visible && (
                  <Button
                    preset="filled"
                    key={index}
                    text={option.title}
                    style={{
                      paddingVertical: spacing.md,
                      backgroundColor: option.bgColor,
                    }}
                    LeftAccessory={() => (
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={colors.stone}
                        paddingHorizontal={spacing.xxs}
                      />
                    )}
                    onPress={
                      option.navigate &&
                      (() => {
                        navigation.navigate(option.navigateToParent, {
                          screen: option.navigate,
                        });
                        resetInitialConsultationStore(); // clear existing form data
                      })
                    }
                  />
                )
              );
            })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const currentGreeting = () => {
  const currentHour = new Date().getHours();
  switch (Math.floor(currentHour / 6)) {
    case 0:
    case 1:
      return { text: "Good Morning,", icon: "sunny" };
    case 2:
      return { text: "Good Afternoon,", icon: "partly-sunny" };
    default:
      return { text: "Good Evening,", icon: "moon" };
  }
};
