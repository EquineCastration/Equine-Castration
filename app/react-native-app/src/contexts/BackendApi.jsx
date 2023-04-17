import { getAccountApi } from "api/account";
import { getRegistrationRulesApi } from "api/registrationRules";
import ky from "ky";
import { createContext, useCallback, useContext, useMemo } from "react";
const BackendApiContext = createContext({});
export const useBackendApi = () => useContext(BackendApiContext);

/** Default KY instance options for hitting the backend API */
export const getBackendDefaults = () => ({
  prefixUrl: "/api/",
});

export const BackendApiProvider = ({ children }) => {
  // preconfigured ky instance for hitting the backend api
  const api = useMemo(() => ky.create(getBackendDefaults()), []);

  /**
   * A default fetcher for SWR to get data from the backend API
   * @param {*} path the url path relative to `https://{backend}/api/`
   * @returns
   */
  const apiFetcher = useCallback(
    async (path) => await api.get(path).json(),
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
