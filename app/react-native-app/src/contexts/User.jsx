import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Cookies from "js-cookie";
import { useProfile } from "api/user";

const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

// const getCookieProfile = () => {
//   const yum = Cookies.get(".EquineCastration.Profile");
//   return yum ? JSON.parse(yum) : null;
// };

const getCookieProfile = async () => {
  try {
    const value = await AsyncStorage.getItem(".EquineCastration.Profile");
    if (value !== null) {
      const decodedCookie = decodeURIComponent(value.split("=")[1]);
      return JSON.parse(decodedCookie);
    }
  } catch (e) {
    console.log(
      "Error reading cookie '.EquineCastration.Profile' from Async Storage",
      e
    );
  }
  return null;
};

/**
 * Checks User Status on app load,
 * and provides methods to sign a user in and out
 * in response to app events (e.g. Login/Logout)
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getCookieProfile());

  const { data: profile, mutate } = useProfile();

  useEffect(() => {
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
