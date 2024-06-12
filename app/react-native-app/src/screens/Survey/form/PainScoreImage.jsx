import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const PAIN_SCALE_IMAGE = require("assets/pain-scale.png");

export const PainScoreImage = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => {
      return navigation.navigate("CommonStack", {
        screen: "ZoomableImage",
        params: {
          imageSet: [
            {
              source: PAIN_SCALE_IMAGE,
              sourceType: "local",
              caption: "Pain scale",
            },
          ],
        },
      });
    }}
  >
    <Image
      style={{ width: "100%", height: 350 }}
      source={PAIN_SCALE_IMAGE}
      resizeMode="contain"
    />
  </TouchableOpacity>
);
