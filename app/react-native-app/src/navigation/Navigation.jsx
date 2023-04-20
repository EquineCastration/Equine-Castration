import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "./navigationStack";
import { Account } from "./Account";
import { Home } from "./Home";
import { InitialConsultation } from "./InitialConsultation";
import { Spinner } from "components/Spinner";

export const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check first for relevant cookies including 'keepUserLoggedIn' status in Async Storage
    // it helps in whether to automatically log in the user or not
    const checkLogin = async () => {
      // list of cookies item in async storage to look for
      const cookiesExpected = [
        ".EquineCastration.Config",
        ".EquineCastration.Profile",
        ".EquineCastration.Identity",
      ];

      try {
        // we could auto login here if 'true'
        // as cookies would normally be cleared when user logs out
        // and available if logged in or has been authenticated before
        const isAllCookiesFound = await Promise.all(
          cookiesExpected.map(async (item) => {
            const itemValue = await AsyncStorage.getItem(item);
            return itemValue !== null && itemValue !== undefined;
          })
        ).then((results) => results.every(Boolean));

        // if above is true
        // we will do another check just to ensure
        // we will check 'keepUserLoggedIn' status
        // this will be set to 'false' when user logs out and vice versa
        if (isAllCookiesFound) {
          try {
            const loginStatus = await AsyncStorage.getItem("keepUserLoggedIn");
            setIsLoggedIn(loginStatus); // Set 'isLoggedin' as true if all condition met
          } catch (err) {
            console.log(err);
          }
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false); // close the loading status
    };
    checkLogin();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn && <Stack.Screen name="Account" component={Account} />}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="InitialConsultation"
              component={InitialConsultation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
