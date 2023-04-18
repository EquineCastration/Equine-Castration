import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { colors, font } from "style/style";

export const BasicBackButton = ({ color = colors.primary[800], backTitle }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={handlePress}
    >
      <Ionicons name="arrow-back-outline" size={24} color={color} />
      {backTitle && (
        <Text style={{ color, marginLeft: 5, fontSize: font.size["md"] }}>
          {backTitle}
        </Text>
      )}
    </TouchableOpacity>
  );
};
