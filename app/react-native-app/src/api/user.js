import { useBackendApi } from "contexts/BackendApi";
import useSWR from "swr";

const fetchKeys = {
  me: "user/me",
  userList: "users",
};

/**
 * Get an authenticated user's profile
 * @returns
 */
export const useProfile = () => {
  const { apiFetcher } = useBackendApi();

  return useSWR(
    fetchKeys.me,
    async (url) => {
      try {
        return await apiFetcher(url);
      } catch (e) {
        if (e?.response?.status === 401) return null;
        throw e;
      }
    },
    { suspense: false, refreshInterval: 600000 } // re-check profile every 10mins in case of cookie expiry
  );
};

export const getUserApi = ({ api }) => ({
  /**
   * Save the User's UI Culture
   * @param {*} culture a culture/locale/language code
   * @returns
   */
  setUICulture: (culture) =>
    api.put("user/uiCulture", {
      json: culture,
    }),
});

/**
 * Get a list of users
 * @returns
 */
export const useUserList = () => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    fetchKeys.userList,
    async (url) => {
      try {
        const data = await apiFetcher(url);
        return data;
      } catch (error) {
        console.log("Error fetching usersList", error);
        return error;
      }
    },
    { suspense: false }
  );
};