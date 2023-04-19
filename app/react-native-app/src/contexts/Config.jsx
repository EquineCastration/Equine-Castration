import { createContext, useContext, useState, useEffect } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const BackendConfigContext = createContext({});

export const useBackendConfig = () => useContext(BackendConfigContext);

const getCookieConfig = async () => {
  const yum = await AsyncStorage.getItem(".EquineCastration.Config");
  return yum ? JSON.parse(yum) : null;
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
