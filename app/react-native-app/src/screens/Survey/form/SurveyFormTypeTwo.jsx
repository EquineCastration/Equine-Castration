import {
  GroupCheckBoxField,
  InputField,
  ToggleField,
  SliderField,
} from "components/forms";
import { View } from "react-native";
import { PainScoreImage } from "./PainScoreImage";

/**
 * This form is only applicable to the survey types:
 * - PostDayFourteen
 */

export const SurveyFormTypeTwo = ({ values, disabled, navigation }) => {
  return (
    <View>
      <ToggleField
        label="Has your horse returned to normal eating and drinking behaviours?"
        name="hasReturnedToNormalBehaviour"
        variant="checkbox"
        disabled={disabled}
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
        disabled={disabled}
      />
      <GroupCheckBoxField
        label="Has the surgical site fully healed? "
        name="hasSurgicalSiteHealed"
        options={["Yes", "No", "Other"]}
        disabled={disabled}
      />
      {values?.hasSurgicalSiteHealed === "Other" && (
        <InputField
          label="If other, please specify"
          name="hasSurgicalSiteHealedOther"
          disabled={disabled}
        />
      )}
      <GroupCheckBoxField
        label="Is there any swelling present at the surgical sites?"
        name="hasSwellingAtSurgicalSite"
        options={[
          "No",
          "Yes- small amount around site but only visible when looking closely",
          "Yes- around the size of an orange",
          "Yes- around the size of a football",
        ]}
        disabled={disabled}
      />
      <SliderField
        name="pictogramPainScore"
        label="On a scale of 1-12, how would you rate your horse's pain?"
        maxVal={12}
        disabled={disabled}
      />
      <PainScoreImage navigation={navigation} />

      <GroupCheckBoxField
        label="Did your horse have any complications in the first two weeks postoperatively?"
        name="firstTwoWeeksComplications"
        options={[
          "No",
          "Yes - infection",
          "Yes - bleeding",
          "Yes - tissue or gut protruding from surgery site ",
          "Yes - other",
        ]}
        disabled={disabled}
      />
      {values?.firstTwoWeeksComplications?.toLowerCase().includes("yes") && (
        <InputField
          label="If yes, please specify"
          name="firstTwoWeeksComplicationsYesOther"
          disabled={disabled}
        />
      )}
      <InputField
        label="If your horse required veterinary attention for any complications, please provide the practice name."
        name="requiredVetOrComplications"
        numberOfLines={3}
        multiline
        placeholder="If not applicable, please input n/a"
        disabled={disabled}
      />
      <InputField
        label="If you would like to add any further information, there is space below."
        name="furtherInformation"
        numberOfLines={3}
        multiline
        placeholder="If not applicable, please input n/a"
        disabled={disabled}
      />
    </View>
  );
};
