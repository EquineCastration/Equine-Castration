import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackendConfigContext = createContext({});

export const useBackendConfig = () => useContext(BackendConfigContext);

const getCookieConfig = async () => {
  try {
    const value = await AsyncStorage.getItem(".EquineCastration.Config");
    if (value !== null) {
      const decodedCookie = decodeURIComponent(value.split("=")[1]);
      return JSON.parse(decodedCookie);
    }
  } catch (e) {
    console.log(
      "Error reading cookie '.EquineCastration.Config' from Async Storage",
      e
    );
  }
  return null;
};

export const BackendConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(getCookieConfig());

  const context = { config };

  return (
    <BackendConfigContext.Provider value={context}>
      {children}
    </BackendConfigContext.Provider>
  );
};
