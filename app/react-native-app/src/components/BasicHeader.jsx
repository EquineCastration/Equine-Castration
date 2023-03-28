import { Text, View } from "react-native";

export const BasicHeader = ({ primaryTxt, secondaryTxt }) => {
  return (
    <View>
      <Text className="font-bold text-4xl text-primary-900">{primaryTxt}</Text>
      <Text className="font-normal text-xl text-primary-400">
        {secondaryTxt}
      </Text>
    </View>
  );
};
