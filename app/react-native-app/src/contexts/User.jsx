import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "api/user";

const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

// Clear the entire AsyncStorage ()
// const clearAsyncStorage = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log("AsyncStorage cleared!");
//   } catch (e) {
//     console.log("Error clearing AsyncStorage: ", e);
//   }
// };

/**
 * Checks User Status on app load,
 * and provides methods to sign a user in and out
 * in response to app events (e.g. Login/Logout)
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { data: profile, mutate } = useProfile();

  useEffect(() => {
    // this is where our cookies suppose to be stored
    const checkAsyncStorage = async () => {
      // list of cookies item in async storage to look for
      const cookiesExpected = [
        ".EquineCastration.Config",
        ".EquineCastration.Profile",
        ".EquineCastration.Identity",
      ];
      try {
        // we are checking if cookies exist
        // as cookies would normally be cleared when user logs out
        // and available if logged in or has been authenticated before
        const isAllCookiesFound = await Promise.all(
          cookiesExpected.map(async (item) => {
            const itemValue = await AsyncStorage.getItem(item);
            return itemValue !== null && itemValue !== undefined;
          })
        ).then((results) => results.every(Boolean));

        // if above is true,
        // this only we will set user with profile
        if (isAllCookiesFound) {
          // TODO: Look into how client was able to make authenticated request even without cookies (not Backend issue)
          // could have simply set user with profile
          // as only authenticated user can make api calls to get their profile
          // but, for some reason on Android, valid cookies are being added from somewhere even after clearing cookies
          // thus, this check was added to restrict that
          setUser(profile);
        }
      } catch (error) {
        console.log("Error reading cookies from Async Storage", error);
      }
    };
    checkAsyncStorage();
  }, [profile]);

  const signOut = () => setUser(null);
  const updateProfile = () => mutate();

  const context = useMemo(
    () => ({ user, signIn: setUser, signOut, updateProfile }),
    [user, setUser, signOut, updateProfile]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
