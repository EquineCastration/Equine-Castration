import colors from "../configs/colors";

export const initialsOptions = [
  {
    title: "Initial Consultation",
    navigate: "InitialConsultationStepOne", // screen name
    icon: "ios-brush-outline", // only accepts ionicons
  },
  {
    title: "List of Horses",
    navigate: "RecordList", // screen name
    icon: "documents-outline", // only accepts ionicons
  },
  {
    title: "Follow up",
    bgColor: colors.lightGreen,
    icon: "expand-outline",
  },
  {
    title: "Review",
    bgColor: colors.lightOrange,
    icon: "file-tray-full-outline",
  },
];
