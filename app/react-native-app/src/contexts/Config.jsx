import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackendConfigContext = createContext({});

export const useBackendConfig = () => useContext(BackendConfigContext);

const getCookieConfig = async () => {
  try {
    const value = await AsyncStorage.getItem(".EquineCastration.Config");
    console.log("config cookies", JSON.parse(value));
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log("Error reading cookies from Async Storage", e);
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
