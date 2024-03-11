import { GroupCheckBoxField, InputField, ToggleField } from "components/forms";
import { View } from "react-native";

/**
 * This form is only applicable to the survey types:
 * - PostMonthThree
 */

export const SurveyFormTypeThree = ({ values, disabled }) => {
  return (
    <View>
      <ToggleField
        label="Has your horse returned to his normal self? "
        name="hasReturnedToNormalSelf"
        variant="checkbox"
        disabled={disabled}
      />
      <GroupCheckBoxField
        label="Did your horse have any complications from two weeks postoperatively to now?"
        name="afterTwoWeeksComplications"
        options={[
          "No",
          "Yes - infection",
          "Yes - protruding tissue or gut from the surgical site",
          "Yes - other",
        ]}
        disabled={disabled}
      />
      {values?.afterTwoWeeksComplications?.toLowerCase().includes("yes") && (
        <InputField
          label="If yes, please specify"
          name="afterTwoWeeksComplicationsYesOther"
          disabled={disabled}
        />
      )}
      <ToggleField
        label="Is there any swelling present at the surgical sites?"
        name="hasSwellingPresentAtSurgicalSite"
        variant="checkbox"
        disabled={disabled}
      />
      <ToggleField
        label="Is there any discharge coming from the surgical sites? "
        name="hasAnyDischarge"
        variant="checkbox"
        disabled={disabled}
      />
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
