import { View, Text, StyleSheet, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "contexts/User";
import Toast from "react-native-toast-message";

import { HomeStack } from "./HomeStack";
import { font, colors } from "style/style";
import { InitialConsultationStack } from "./InitialConsultationStack";
import { CaseStack } from "./CaseStack";
import { useBackendApi } from "contexts/BackendApi";
import { useState, useEffect } from "react";
import { Spinner } from "components/Spinner";
import { BasicTouchableOpacity } from "components/BasicTouchableOpacity";
import { permissions } from "constants/site-permissions";

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: font.size["normal"],
    color: colors.primary[700],
    fontWeight: 300,
  },
});

const AccountItem = ({ ...props }) => (
  <BasicTouchableOpacity
    iconSize={17}
    color={colors.primary[800]}
    fontSize={font.size["sm"]}
    fontWeight={500}
    transparent
    justifyContent="flex-start"
    paddingVertical={2}
    {...props}
  />
);

export const DrawerNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setIsLoadingText] = useState();
  const [feedback, setFeedback] = useState();

  const { user, signOut } = useUser();

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const DrawerContent = (props) => {
    const {
      account: { logout },
      users: { delete: deleteMe },
    } = useBackendApi();

    const handleAccountDeletion = async () => {
      try {
        setIsLoading(true);
        setIsLoadingText("Deleting account");
        const response = await deleteMe();

        if (response && response.status === 204) {
          setFeedback({
            status: "success",
            message: "Account deleted successfully!",
          });

          await logout();
          await AsyncStorage.clear();
          signOut();
        }
      } catch (e) {
        console.log(e);
        switch (e?.response?.status) {
          default:
            setFeedback({
              status: "error",
              message: "An unknown error has occurred.",
            });
        }
      }
      setIsLoading(false);
    };

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
        <View
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 5,
            backgroundColor: colors.ui.bg,
            paddingVertical: 10,
            paddingHorizontal: 20,
            gap: 5,
          }}
        >
          <AccountItem
            title="Sign Out"
            icon="log-out-outline"
            fontSize={font.size["normal"]}
            onPress={() => {
              Alert.alert("Sign out confirmation", "Do you want to sign out?", [
                {
                  text: "Cancel",
                  style: "cancel", // only applicable to ios
                },
                {
                  text: "OK",
                  onPress: async () => {
                    setIsLoading(true);
                    setIsLoadingText("Signing out");
                    await logout();
                    await AsyncStorage.clear();
                    signOut();
                    setIsLoading(false);
                  },
                },
              ]);
            }}
          />

          <AccountItem
            title="Delete Account"
            icon="trash-outline"
            color={colors.error}
            onPress={() => {
              Alert.alert(
                "Do you want to delete your account?",
                "This action will permanently delete your account and all associated cases",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => handleAccountDeletion(),
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading ? <Spinner text={loadingText} /> : null}
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

        {user?.permissions.includes(permissions.CreateCases) && (
          <Drawer.Screen
            name="InitialConsultation"
            component={InitialConsultationStack}
            options={{ title: "Create Case" }}
          />
        )}
        <Drawer.Screen
          name="Cases"
          component={CaseStack}
          options={{ title: "View Cases" }}
        />
      </Drawer.Navigator>
    </>
  );
};
