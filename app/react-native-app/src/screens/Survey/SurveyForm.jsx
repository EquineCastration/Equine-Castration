import { Formik } from "formik";
import { Screen } from "components/Screen";
import { spacing } from "style";
import { View } from "react-native";
import { Button } from "components/Button";
import { surveyTypes } from "constants/survey-types";
import {
  SurveyFormTypeOne,
  SurveyFormTypeThree,
  SurveyFormTypeTwo,
  evaluateInitialValues,
  evaluateValidationSchema,
} from "./form";

export const SurveyForm = ({ navigation, route }) => {
  const { caseId, surveyType, surveyData } = route.params;

  const initialValues = evaluateInitialValues(
    caseId,
    surveyType.id,
    surveyType.name,
    surveyData
  );

  const validationSchema = evaluateValidationSchema(surveyType.name);
  const SurveyForm = getForm(surveyType.name);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values }) => (
        <Screen>
          <SurveyForm values={values} />
          <View style={{ marginVertical: spacing.md }}>
            <Button
              text="Submit Survey"
              style={{
                alignSelf: "center",
                paddingHorizontal: spacing.xl,
              }}
              onPress={handleSubmit}
              preset="filled"
            />
          </View>
        </Screen>
      )}
    </Formik>
  );
};

const getForm = (surveyType) => {
  switch (surveyType) {
    case surveyTypes.PostTwentyFourHours:
    case surveyTypes.PostDayThree:
    case surveyTypes.PostDayFive:
    case surveyTypes.PostDaySeven:
      return SurveyFormTypeOne;

    case surveyTypes.PostDayFourteen:
      return SurveyFormTypeTwo;

    case surveyTypes.PostMonthThree:
      return SurveyFormTypeThree;
  }
};
