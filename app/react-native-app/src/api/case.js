import { useBackendApi } from "contexts/BackendApi";
import useSWR from "swr";

export const fetchKeys = {
  caseList: "cases",
  ownerCaseList: "cases/owner",
  case: (id) => `cases/${id}`,
};

export const getCaseApi = ({ api }) => ({
  create: (values) => api.post("cases", values), // create

  edit: (values, id) => api.put(`cases/${id}`, values), // update

  delete: (id) => api.delete(`cases/${id}`), // delete
});

/**
 * Get a list of Cases
 */
export const useCaseList = (isOwner) => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    isOwner ? fetchKeys.ownerCaseList : fetchKeys.caseList,
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
