import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackendConfigContext = createContext({});

export const useBackendConfig = () => useContext(BackendConfigContext);

const getCookieConfig = async () => {
  const value = await AsyncStorage.getItem(".EquineCastration.Config");
  if (value) {
    const decodedCookie = decodeURIComponent(value.split("=")[1]);
    return JSON.parse(decodedCookie);
  }
  return null;
};

export const BackendConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const assignConfig = async () => {
      setConfig(await getCookieConfig());
    };
    assignConfig();
  }, []);

  const context = { config };

  return (
    <BackendConfigContext.Provider value={context}>
      {children}
    </BackendConfigContext.Provider>
  );
};
