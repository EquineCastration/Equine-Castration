import { Text, View } from "react-native";

export const BasicHeader = ({
  primaryTxt,
  secondaryTxt,
  primaryColor = "text-primary-900",
  secondaryColor = "text-primart-400",
}) => {
  return (
    <View>
      <Text className={`font-bold text-4xl ${primaryColor}`}>{primaryTxt}</Text>
      <Text className={`font-normal text-xl ${secondaryColor}`}>
        {secondaryTxt}
      </Text>
    </View>
  );
};
