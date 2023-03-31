import { SafeAreaView, View, ScrollView } from "react-native";
import { BasicHeader } from "components/BasicHeader";

export const DefaultLayout = ({ children, secondaryTxt, primaryTxt }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <BasicHeader primaryTxt={primaryTxt} secondaryTxt={secondaryTxt} />
        {children}
      </View>
    </SafeAreaView>
  );
};
