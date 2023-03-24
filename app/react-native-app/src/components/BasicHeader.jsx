import { Text, View } from "react-native";
import colors from "../configs/colors";
import { BasicTouchableOpacity } from "./BasicTouchableOpacity";

export const BasicHeader = ({ backNavigation, primaryTxt, secondaryTxt }) => {
  return (
    <>
      {backNavigation && (
        <BasicTouchableOpacity
          btnWidth="10%"
          bgColor="transparent"
          color="black"
          icon="arrow-back"
          onPress={backNavigation}
        />
      )}

      <View className={`${!backNavigation ? "mt-24" : ""}`}>
        <Text className="font-bold text-4xl" style={{ color: colors.primary }}>
          {primaryTxt}
        </Text>
        <Text className="font-normal text-xl" style={{ color: colors.lghtTxt }}>
          {secondaryTxt}
        </Text>
      </View>
    </>
  );
};
