import { Text, View } from "react-native";
import colors from "../configs/colors";

export const BasicHeader = ({ primaryTxt, secondaryTxt }) => {
  return (
    <View>
      <Text className="font-bold text-4xl" style={{ color: colors.primary }}>
        {primaryTxt}
      </Text>
      <Text className="font-normal text-xl" style={{ color: colors.lghtTxt }}>
        {secondaryTxt}
      </Text>
    </View>
  );
};
