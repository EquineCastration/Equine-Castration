import colors from "../configs/colors";

export const initialsOptions = [
  {
    title: "Initial Consultation",
    navigate: "InitialConsultationStepOne", // screen name
    icon: "arrow-forward-circle-outline", // only accepts ionicons
  },
  {
    title: "Follow up",
    bgColor: colors.lightGreen,
  },
  {
    title: "Review",
    bgColor: colors.lightOrange,
  },
];
