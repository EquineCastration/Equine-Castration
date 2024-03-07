import { GroupCheckBoxField, InputField, ToggleField } from "components/forms";
import { SliderField } from "components/forms/SliderField";
import { View } from "react-native";

/**
 * This form is only applicable to the survey types:
 * - PostTwentyFourHours
 * - PostDayThree
 * - PostDayFive
 * - PostDaySeven
 */

export const SurveyFormTypeOne = ({ values }) => {
  return (
    <View>
      <ToggleField
        label="Has your horse returned to normal eating and drinking behaviours?"
        name="hasReturnedToNormalBehaviour"
        variant="checkbox"
      />
      <GroupCheckBoxField
        label="Does your horse appear stiff or lame?"
        name="isStiffOrLame"
        options={[
          "No",
          "Yes- mild (They are slightly stiff initially but after a few steps of walk they are back to ‘normal’)",
          "Yes- moderate (They are reluctant to walk but willing to, and appear consistently stiff which improves with walking)",
          "Yes- Severe (They are very reluctant to walk and the stiffness/lameness does not improve with walking)",
        ]}
      />
      <GroupCheckBoxField
        label="Is there any discharge coming from the wound?"
        name="hasWoundDischarge"
        options={[
          "No",
          "Yes- small amounts of red colour fluid/blood",
          "Yes- steady flow of blood (unable to count the drips)",
          "Yes- light yellow/straw coloured fluid",
          "Yes- white/yellow thicker discharge/pus",
          "Other",
        ]}
      />
      {values?.hasWoundDischarge === "Other" && (
        <InputField
          label="If other, please specify"
          name="hasWoundDischargeOther"
        />
      )}
      <ToggleField
        label="Is there anything protruding from the surgical site? "
        name="isProtrudingFromSurgicalSite"
        variant="checkbox"
      />
      <GroupCheckBoxField
        label="Is there any swelling present at the surgical sites?"
        name="hasSwellingAtSurgicalSite"
        options={[
          "No",
          "Yes- small amount around site but only visible when looking closely",
          "Yes- around the size of an orange",
          "Yes- around the size of a football",
          "Other",
        ]}
      />
      {values?.hasSwellingAtSurgicalSite === "Other" && (
        <InputField
          label="If other, please specify"
          name="hasSwellingAtSurgicalSiteOther"
        />
      )}

      <SliderField
        name="pictogramPainScore"
        label="On a scale of 1-12, how would you rate your horse's pain?"
        maxVal={12}
      />
      <InputField
        label="If your horse required veterinary attention for any complications, please provide the practice name."
        name="requiredVetOrComplications"
        numberOfLines={3}
        multiline
        placeholder="If not applicable, please input n/a"
      />

      <InputField
        label="If you would like to add any further information, there is space below."
        name="furtherInformation"
        numberOfLines={3}
        multiline
        placeholder="If not applicable, please input n/a"
      />
    </View>
  );
};
