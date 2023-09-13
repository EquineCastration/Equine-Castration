import { getAccountApi } from "api/account";
import { getRegistrationRulesApi } from "api/registrationRules";
import { getCaseApi } from "api/case";
import { createContext, useCallback, useContext, useMemo } from "react";
import {
  LOCAL_PUBLIC_API,
  EQUINE_CASTRATION_IDENTIFIER,
} from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

// list of cookies name to be stored in async storage
const cookiesExpected = [
  ".EquineCastration.Config",
  ".EquineCastration.Profile",
  ".EquineCastration.Identity",
];

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
      case: getCaseApi(baseContext),
    }),
    [baseContext]
  );

  // Add an interceptor to include stored cookies from async storage in requests
  api.interceptors.request.use(async (config) => {
    // Get the cookies from async storage
    const cookies = await Promise.all(
      cookiesExpected.map((cookieName) => AsyncStorage.getItem(cookieName))
    );

    // If cookies exist
    if (cookies?.length >= 1) {
      // Concatenate the cookie values into a single string
      const cookieHeaderValue = cookies.filter((cookie) => cookie).join("; ");
      config.headers["Cookie"] = cookieHeaderValue; // add them to the request headers
    }
    config.headers["Equine-Castration-Identifier"] =
      EQUINE_CASTRATION_IDENTIFIER; // will be used to identify requests from the app
    return config;
  });

  // Since RN doesn't have the same facility as on the web app where browser automatically stores cookies into localstorage
  // Add response interceptor to extract cookies from the Set-Cookie header of the response.
  // Extractinng relevant cookies name-value pairs and storing them in async storage
  api.interceptors.response.use(
    (response) => {
      const cookiesStr = response.headers["set-cookie"]; // an array with one string item

      if (cookiesStr) {
        const cookiesArr = cookiesStr[0].split(", "); // split the one an only string by comma and space to get an array of cookies
        // map through each array item to extract only name-value pair
        const cookiesNameValueArr = cookiesArr.map(
          (cookie) => cookie.split(";")[0]
        );
        cookiesExpected.forEach(async (item) => {
          const cookieItem = // get cookie name-value pair for the item, if not available assign empty string
            cookiesNameValueArr.filter((cookie) => cookie.includes(item))[0] ||
            "";

          // only if cookie exist
          if (cookieItem) {
            try {
              await AsyncStorage.setItem(item, cookieItem); // store the cookieItem in async storage
            } catch (e) {
              console.log(`Error setting cookie for '${item}' `, e);
            }
          }
        });
      }
      return response;
    },
    (error) => {
      console.log(
        `Error while intercepting cookies on '${error.config.url}'`,
        error
      );
      return Promise.reject(error);
    }
  );

  return (
    <BackendApiContext.Provider value={context}>
      {children}
    </BackendApiContext.Provider>
  );
};
