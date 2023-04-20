import Stack from "./NavigationStack";
import { ScreenHeader } from "components/ScreenHeader";
import { colors } from "style/style";

const headerOptions = {
  headerShown: true,
  headerShadowVisible: false,
  title: "",
  headerTintColor: colors.light,
};

export const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerBackground: () => <ScreenHeader title="Equine Castration" />,
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
};
