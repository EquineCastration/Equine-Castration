import { useBackendApi } from "contexts/BackendApi";
import useSWR from "swr";

export const fetchKeys = {
  surveyList: (caseId) => `surveys/ListByCase/${caseId}`,
  surveyType: (caseId) => `surveys/EligibleSurveyType/${caseId}`,
};

export const getSurveyApi = ({ api }) => ({
  create: (values) => api.post("surveys", values),
});

/**
 * Get a list of surveys for a case
 */
export const useSurveyList = (caseId) => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    caseId ? fetchKeys.surveyList(caseId) : null,
    async (url) => {
      const data = await apiFetcher(url);
      return data;
    },
    { suspense: false }
  );
};

/**
 * Get eligible survey typed for a case
 */
export const useEligibleSurveyType = (caseId) => {
  const { apiFetcher } = useBackendApi();
  return useSWR(
    caseId ? fetchKeys.surveyType(caseId) : null,
    async (url) => {
      const data = await apiFetcher(url);
      return data;
    },
    { suspense: false }
  );
};
