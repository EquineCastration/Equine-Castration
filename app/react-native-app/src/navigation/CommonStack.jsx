import { ZoomableImageScreen } from "screens/ZoomableImage";
import { Stack } from "./navigationStack";

export const CommonStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ZoomableImage" component={ZoomableImageScreen} />
    </Stack.Navigator>
  );
};
