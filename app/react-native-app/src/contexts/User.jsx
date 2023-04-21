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
    // clearAsyncStorage();
    setUser(profile);
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
