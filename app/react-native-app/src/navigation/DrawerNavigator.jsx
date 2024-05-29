import { View, Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "contexts/User";
import Toast from "react-native-toast-message";

import { HomeStack } from "./HomeStack";
import { InitialConsultationStack } from "./InitialConsultationStack";
import { CaseStack } from "./CaseStack";
import { useBackendApi } from "contexts/BackendApi";
import { useState, useEffect } from "react";
import { Spinner } from "components/Spinner";
import { permissions } from "constants/site-permissions";
import { useStyle } from "contexts/StyleProvider";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { Ionicons } from "@expo/vector-icons";
import { spacing, fonts, colors } from "style";

const Drawer = createDrawerNavigator();

const AccountItem = ({ title, icon, color, onPress }) => (
  <Button
    preset="ghost"
    text={title}
    style={{
      justifyContent: "flex-start",
    }}
    LeftAccessory={() => <Ionicons name={icon} size={16} color={color} />}
    textStyle={{
      color,
      paddingHorizontal: spacing.xs,
      fontFamily: fonts?.raleway?.semiBold,
    }}
    onPress={onPress}
  />
);

export const DrawerNavigator = () => {
  const { colors: colorScheme } = useStyle();
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
      <View style={{ flex: 1, backgroundColor: colorScheme?.background }}>
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
        <View
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            gap: spacing.md,
          }}
        >
          <AccountItem
            title="Sign Out"
            icon="log-out-outline"
            color={colorScheme?.textLink}
            fontSize={16}
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
            color={colors.danger}
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
          drawerLabelStyle: {
            fontSize: 16,
            color: colorScheme?.text,
            fontFamily: fonts?.raleway?.normal,
          },
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
