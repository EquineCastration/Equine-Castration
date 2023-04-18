import { getAccountApi } from "api/account";
import { getRegistrationRulesApi } from "api/registrationRules";
import { createContext, useCallback, useContext, useMemo } from "react";
import { LOCAL_PUBLIC_API } from "react-native-dotenv";

import axios from "axios";

const BackendApiContext = createContext({});
export const useBackendApi = () => useContext(BackendApiContext);

/** Default axios instance options for hitting the backend API */
export const getBackendDefaults = () => ({
  baseURL: `${LOCAL_PUBLIC_API}/api/`,
});

export const BackendApiProvider = ({ children }) => {
  // preconfigured axios instance for hitting the backend api
  const api = useMemo(() => axios.create(getBackendDefaults()), []);

  /**
   * A default fetcher for SWR to get data from the backend API
   * @param {*} path the url path relative to `https://{backend}/api/`
   * @returns
   */

  const apiFetcher = useCallback(
    async (path) => {
      const response = await api.get(path);
      return response.data;
    },
    [api]
  );

  const baseContext = useMemo(() => ({ api, apiFetcher }), [api, apiFetcher]);

  const context = useMemo(
    () => ({
      ...baseContext,
      account: getAccountApi(baseContext),
      registrationRules: getRegistrationRulesApi(baseContext),
    }),
    [baseContext]
  );

  return (
    <BackendApiContext.Provider value={context}>
      {children}
    </BackendApiContext.Provider>
  );
};
