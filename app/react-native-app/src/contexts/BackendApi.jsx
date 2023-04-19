import { getAccountApi } from "api/account";
import { getRegistrationRulesApi } from "api/registrationRules";
import { createContext, useCallback, useContext, useMemo } from "react";
import { LOCAL_PUBLIC_API } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Add an interceptor to extract cookies from the Set-Cookie header
  api.interceptors.response.use(
    (response) => {
      const cookiesStr = response.headers["set-cookie"];

      if (cookiesStr) {
        const cookiesArr = cookiesStr[0].split(", "); // split the string by comma and space to get an array of cookies
        const cookiesNameValueArr = cookiesArr.map(
          (cookie) => cookie.split(";")[0]
        );
        const cookiesExpected = [
          ".EquineCastration.Config",
          ".EquineCastration.Profile",
          ".EquineCastration.Identity",
        ];

        cookiesExpected.forEach(async (item) => {
          //store them if match found else empty string
          const cookieItem =
            cookiesNameValueArr.filter((cookie) => cookie.includes(item))[0] ||
            "";
          try {
            await AsyncStorage.setItem(item, cookieItem);
          } catch (e) {
            console.log("error setting cookie", e);
          }
        });
      }
      return response;
    },
    (error) => {
      console.log("Error while intercepting cookies", error);
      return Promise.reject(error);
    }
  );

  return (
    <BackendApiContext.Provider value={context}>
      {children}
    </BackendApiContext.Provider>
  );
};
