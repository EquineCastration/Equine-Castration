import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import { Formik } from "formik";
import { useBackendApi } from "contexts/BackendApi";
import Toast from "react-native-toast-message";
import { surveyTypes } from "constants/survey-types";
import { spacing } from "style";
import { Screen } from "components/Screen";
import { Button } from "components/Button";
import {
  SurveyFormTypeOne,
  SurveyFormTypeThree,
  SurveyFormTypeTwo,
  evaluateInitialValues,
  evaluateValidationSchema,
} from "./form";
import { Spinner } from "components/Spinner";

export const SurveyForm = ({ navigation, route }) => {
  const { caseId, surveyType, surveyData } = route.params;
  const {
    survey: { create },
  } = useBackendApi();
  const [feedback, setFeedback] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const initialValues = evaluateInitialValues(
    caseId,
    surveyType.id,
    surveyType.name,
    surveyData
  );

  const validationSchema = evaluateValidationSchema(surveyType.name);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await create(values);
      setFeedback({
        status: "success",
        message: `Survey submitted successfully!`,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "CaseList" }],
      });
    } catch (e) {
      const error = await e.response;
      switch (error?.status) {
        case 400: {
          let message =
            "There was an issue with your form submission. Please check for errors and try again.";
          setFeedback({ status: "error", message });
          break;
        }
        default:
          setFeedback({
            status: "error",
            message: "An unknown error has occurred.",
          });
      }
    }
    setIsLoading(false);
  };

  const confirmAlert = () =>
    Alert.alert(
      "Confirm submission",
      "Would you like to submit your survey form? Once submitted, you cannot amend the form.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => formRef.current.handleSubmit() },
      ]
    );

  useEffect(() => {
    feedback &&
      Toast.show({
        type: feedback.status,
        text1: feedback.message,
      });
  }, [feedback]);

  const SurveyFormType = getForm(surveyType.name);

  const SubmitButton = () => (
    <View style={{ marginVertical: spacing.md }}>
      <Button
        text="Submit Survey"
        style={{
          alignSelf: "center",
          paddingHorizontal: spacing.xl,
        }}
        onPress={confirmAlert}
        preset="filled"
      />
    </View>
  );

  return (
    <>
      {isLoading ? <Spinner text={"Submitting"} /> : null}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        innerRef={formRef}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Screen>
            <SurveyFormType values={values} disabled={!!surveyData} />
            {!surveyData && <SubmitButton />}
          </Screen>
        )}
      </Formik>
    </>
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
