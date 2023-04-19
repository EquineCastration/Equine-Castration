import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { SafeAreaView, View, Text } from "react-native";
import { colors, font } from "style/style";
import { resetInitialConsultationStore } from "store/InitialConsultationStore";
import { useUser } from "contexts/User";

export const Home = ({ navigation }) => {
  // should be loaded as screen to get navigation prop
  const welcomeTxt = "Welcome Vet";

  const { user } = useUser();
  console.log(user);

  const initialsOptions = [
    {
      title: "Create Case",
      navigate: "InitialConsultationStepOne", // screen name
      icon: "ios-brush-outline", // only accepts ionicons
      bgColor: colors.primary[800],
    },
    {
      title: "View Cases",
      navigate: "CaseList", // screen name
      icon: "documents-outline", // only accepts ionicons
      bgColor: colors.secondary[800],
    },
    {
      title: "Follow up",
      bgColor: colors.patra[900],
      icon: "expand-outline",
    },
    {
      title: "Review",
      bgColor: colors.kanaka[900],
      icon: "file-tray-full-outline",
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: font.size["5xl"],
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          {welcomeTxt}
        </Text>
        {initialsOptions &&
          initialsOptions.map((option, index) => {
            return (
              <BasicTouchableOpacity
                paddingVertical={11}
                key={index}
                title={option.title}
                btnWidth="85%"
                icon={option.icon}
                bgColor={option.bgColor}
                onPress={
                  option.navigate &&
                  (() => {
                    navigation.navigate(option.navigate);
                    resetInitialConsultationStore(); // clear existing form data
                  })
                }
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
};
