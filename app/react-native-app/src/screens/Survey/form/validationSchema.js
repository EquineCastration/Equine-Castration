import { surveyTypes } from "constants/survey-types";
import { boolean, number, object, string } from "yup";

/**
 * This is a helper function that evaluates the validation schema for the survey form
 * @param {*} surveyType - survey type name
 * @returns - validation schema object for the survey form
 */

export const evaluateValidationSchema = (surveyType) => {
  // schema that applies to all survey types
  const commonTypeOne = {
    requiredVetOrComplications: string().required(
      "Required or N/A if no complications."
    ),
    furtherInformation: string().required(
      "Required or N/A if no further information to add."
    ),
  };

  // schema that mostly applies to 24 - 14 days post-op survey types
  const commonTypeTwo = {
    hasReturnedToNormalBehaviour: boolean().required("Please select an option"),
    isStiffOrLame: string().required("Please select an option"),
    hasSwellingAtSurgicalSite: string().required("Please select an option"),
    pictogramPainScore: number()
      .min(1, "Pain score must be at least 1")
      .required("Please use a slider to select a pain score"),
    ...commonTypeOne,
  };

  switch (surveyType) {
    case surveyTypes.PostTwentyFourHours:
    case surveyTypes.PostDayThree:
    case surveyTypes.PostDayFive:
    case surveyTypes.PostDaySeven:
      return object().shape({
        hasWoundDischarge: string().required("Please select an option"),
        hasWoundDischargeOther: string().when("hasWoundDischarge", {
          is: (value) => value && value.toLowerCase().includes("other"),
          then: () => string().required("Please specify"),
          otherwise: () => string(),
        }),
        isProtrudingFromSurgicalSite: boolean().required(
          "Please select an option"
        ),
        hasSwellingAtSurgicalSiteOther: string().when(
          "hasSwellingAtSurgicalSite",
          {
            is: (value) => value && value.toLowerCase().includes("other"),
            then: () => string().required("Please specify"),
            otherwise: () => string(),
          }
        ),
        ...commonTypeTwo,
      });

    case surveyTypes.PostDayFourteen:
      return object().shape({
        hasSurgicalSiteHealed: string().required("Please select an option"),
        hasSurgicalSiteHealedOther: string().when("hasSurgicalSiteHealed", {
          is: (value) => value && value.toLowerCase().includes("other"),
          then: () => string().required("Please specify"),
          otherwise: () => string(),
        }),
        firstTwoWeeksComplications: string().required(
          "Please select an option"
        ),
        firstTwoWeeksComplicationsYesOther: string().when(
          "firstTwoWeeksComplications",
          {
            is: (value) => value && value.toLowerCase().includes("yes"),
            then: () => string().required("Please specify"),
            otherwise: () => string(),
          }
        ),
        ...commonTypeTwo,
      });
    case surveyTypes.PostMonthThree:
      return object().shape({
        hasReturnedToNormalSelf: boolean().required("Please select an option"),
        afterTwoWeeksComplications: string().required(
          "Please select an option"
        ),
        afterTwoWeeksComplicationsYesOther: string().when(
          "afterTwoWeeksComplications",
          {
            is: (value) => value && value.toLowerCase().includes("yes"),
            then: () => string().required("Please specify"),
            otherwise: () => string().notRequired(),
          }
        ),
        hasSwellingPresentAtSurgicalSite: boolean().required(
          "Please select an option"
        ),
        hasAnyDischarge: boolean().required("Please select an option"),
        ...commonTypeOne,
      });
  }
  return {};
};
