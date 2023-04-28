import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "contexts/User";

import { HomeStack } from "./HomeStack";
import { font, colors } from "style/style";
import { InitialConsultationStack } from "./InitialConsultationStack";
import { CaseStack } from "./CaseStack";
import { useBackendApi } from "contexts/BackendApi";
import { useState } from "react";
import { Spinner } from "components/Spinner";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: font.size["normal"],
    color: colors.primary[700],
    fontWeight: 300,
  },
});

export const DrawerNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const DrawerContent = (props) => {
    const {
      account: { logout },
    } = useBackendApi();
    const { user, signOut } = useUser();
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: font.size["sm"],
                  color: colors.primary[800],
                  fontWeight: 300,
                }}
              >
                {user?.fullName?.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontSize: font.size["xs"],
                  color: colors.primary[800],
                  fontWeight: 300,
                }}
              >
                {user?.email}
              </Text>
            </View>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 50,
            backgroundColor: colors.ui.bg,
            padding: 20,
          }}
          onPress={async () => {
            setIsLoading(true);
            await logout();
            await AsyncStorage.clear();
            signOut();
            setIsLoading(false);
          }}
        >
          <Text
            style={[
              styles.drawerLabel,
              {
                fontWeight: 400,
                fontSize: font.size["normal"],
                color: colors.primary[800],
              },
            ]}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {isLoading ? <Spinner text="Signing out" /> : null}
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitle: "",
          drawerLabelStyle: styles.drawerLabel,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen
          name="InitialConsultation"
          component={InitialConsultationStack}
          options={{ title: "Create Case" }}
        />
        <Drawer.Screen
          name="Cases"
          component={CaseStack}
          options={{ title: "View Cases" }}
        />
      </Drawer.Navigator>
    </>
  );
};
