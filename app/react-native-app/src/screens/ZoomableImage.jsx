import { Text } from "components/Text";
import { View } from "react-native";
import ImageView from "react-native-image-zoom-viewer";
import { spacing } from "style";

/**
 * This screen is used to display a zoomable image.
 * Expects an optional route parameter `imageSet` which, if provided, should be an array of objects with the following shape:
 *  source: string; a URI for local images (e.g., require('path/to/image')) or a URL for remote images
 *  sourceType: "local" | "remote"; specifies the image source type
 *  caption: string; the caption to display for the image
 * Defaults to an empty array if not provided.
 */
export const ZoomableImageScreen = ({ route }) => {
  const { imageSet = [] } = route.params;

  const images = imageSet.map((item) => ({
    url: item?.sourceType === "local" ? "" : item?.source,
    props: item?.sourceType === "local" ? { source: item.source } : {},
  }));

  const captions = imageSet?.map((item) => item?.source && item?.caption);

  const renderFooter = (currentIndex) => (
    <View style={{ padding: spacing.md }}>
      <Text style={{ color: "white" }}>{captions[currentIndex]}</Text>
    </View>
  );

  return <ImageView imageUrls={images} renderFooter={renderFooter} />;
};
