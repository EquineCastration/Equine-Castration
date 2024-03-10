import { surveyTypes } from "constants/survey-types";

/**
 * This is a helper function that evaluates the initial values for the survey form
 * @param {*} caseId - case id
 * @param {*} surveyTypeId  - survey type id
 * @param {*} surveyType - survey type name
 * @param {*} data - survey data if available
 * @returns - an object containing the initial values for the survey form
 */

export const evaluateInitialValues = (
  caseId,
  surveyTypeId,
  surveyType,
  data
) => {
  const commonTypeOne = {
    caseId,
    surveyTypeId,
    requiredVetOrComplications: data?.requiredVetOrComplications || "",
    furtherInformation: data?.furtherInformation || "",
  };

  const commonTypeTwo = {
    hasReturnedToNormalBehaviour: data?.hasReturnedToNormalBehaviour || false,
    isStiffOrLame: data?.isStiffOrLame || "",
    hasSwellingAtSurgicalSite: data?.hasSwellingAtSurgicalSite || "",
    pictogramPainScore: data?.pictogramPainScore || 0,
    ...commonTypeOne,
  };

  switch (surveyType) {
    case surveyTypes.PostTwentyFourHours:
    case surveyTypes.PostDayThree:
    case surveyTypes.PostDayFive:
    case surveyTypes.PostDaySeven:
      return {
        hasWoundDischarge: data?.hasWoundDischarge,
        hasWoundDischargeOther: data?.hasWoundDischargeOther || "",
        isProtrudingFromSurgicalSite:
          data?.isProtrudingFromSurgicalSite || false,
        hasSwellingAtSurgicalSiteOther:
          data?.hasSwellingAtSurgicalSiteOther || "",
        ...commonTypeTwo,
      };
    case surveyTypes.PostDayFourteen:
      return {
        hasSurgicalSiteHealed: data?.hasSurgicalSiteHealed || "",
        hasSurgicalSiteHealedOther: data?.hasSurgicalSiteHealedOther || "",
        firstTwoWeeksComplications: data?.firstTwoWeeksComplications || "",
        firstTwoWeeksComplicationsYesOther:
          data?.firstTwoWeeksComplicationsYesOther || "",
        ...commonTypeTwo,
      };
    case surveyTypes.PostMonthThree:
      return {
        hasReturnedToNormalSelf: data?.hasReturnedToNormalSelf || false,
        afterTwoWeeksComplications: data?.afterTwoWeeksComplications || "",
        afterTwoWeeksComplicationsYesOther:
          data?.afterTwoWeeksComplicationsYesOther || "",
        hasSwellingPresentAtSurgicalSite:
          data?.hasSwellingPresentAtSurgicalSite || false,
        hasAnyDischarge: data?.HasAnyDischarge || false,
        ...commonTypeOne,
      };
  }

  return {};
};
