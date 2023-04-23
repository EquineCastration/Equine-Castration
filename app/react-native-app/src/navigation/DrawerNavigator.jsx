import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "contexts/User";

import { colors } from "style/style";
import { HomeStack } from "./HomeStack";
import { font } from "style/style";
import { ScreenHeader } from "components/ScreenHeader";
import { InitialConsultationStack } from "./InitialConsultationStack";
import { CaseStack } from "./CaseStack";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: font.size["normal"],
    color: colors.primary[700],
    fontWeight: 300,
  },
});

const DrawerContent = (props) => {
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
            <Text>{user?.fullName?.toUpperCase()}</Text>
            <Text>{user?.email}</Text>
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
          signOut();
          await AsyncStorage.clear();
        }}
      >
        <Text style={[styles.drawerLabel, { fontWeight: 400 }]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
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
  );
};
