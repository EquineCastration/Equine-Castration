import { useBackendApi } from "contexts/BackendApi";
import useSWR from "swr";

export const fetchKeys = {
  caseList: "cases",
  case: (id) => `cases/${id}`,
};

export const getCaseApi = ({ api }) => ({
  create: (values) => api.post("cases", values), // create

  edit: (values, id) => api.put(`cases/${id}`, values), // update

  delete: (id) => api.delete(`case/${id}`), // delete
});

/**
 * Get a list of Cases
 */
export const useCaseList = () => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    fetchKeys.caseList,
    async (url) => {
      const data = await apiFetcher(url);
      return data;
    },
    { suspense: false }
  );
};

/**
 * Get a single case
 */
export const useCase = (id) => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    fetchKeys.case(id),
    async (url) => {
      const data = await apiFetcher(url);
      return data;
    },
    { suspense: false }
  );
};

/**
 * Get a user's Team Id
 */
export const getUserTeam = (userEmail) => {
  const { apiFetcher } = useBackendApi();
  return useSWR(fetchKeys.getUserTeam(userEmail), apiFetcher, {
    suspense: true,
  });
};
