import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { SafeAreaView, View, Text } from "react-native";
import { colors, font } from "style/style";
import { ResetInitialConsultationStore } from "store/store";

export const Login = ({ navigation }) => {
  // should be loaded as screen to get navigation prop
  const welcomeTxt = "Welcome Vet";

  const initialsOptions = [
    {
      title: "Initial Consultation",
      navigate: "InitialConsultationStepOne", // screen name
      icon: "ios-brush-outline", // only accepts ionicons
    },
    {
      title: "List of Horses",
      navigate: "RecordList", // screen name
      icon: "documents-outline", // only accepts ionicons
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
                key={index}
                title={option.title}
                btnWidth="85%"
                icon={option.icon}
                bgColor={option.bgColor}
                onPress={
                  option.navigate &&
                  (() => {
                    navigation.navigate(option.navigate);
                    ResetInitialConsultationStore(); // clear existing form data
                  })
                }
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
};
