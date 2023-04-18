import { useBackendApi } from "contexts/BackendApi";
import useSWR from "swr";
import { Spinner } from "components/Spinner";

const fetchKeys = {
  userList: "users",
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
    { suspense: false }
  );
};
