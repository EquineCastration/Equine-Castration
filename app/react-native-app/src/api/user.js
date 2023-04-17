import { useBackendApi } from "contexts/BackendApi";
import useSWR from "swr";

const fetchKeys = {
  userList: "https://smooth-taxes-jam-81-129-109-219.loca.lt/api/users",
};

/**
 * Get a list of users
 * @returns
 */
export const useUserList = () => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    fetchKeys.userList,
    async (url) => {
      const data = await apiFetcher(url);
      return data;
    },
    { suspense: true }
  );
};
