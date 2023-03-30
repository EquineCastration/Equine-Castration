import { Store } from "pullstate";

export const InitialConsultationForm = {
  // The followings are relevant elements for InitialConsultation Form
  // These are being used in the form
  // as field name, field label, field options and in formik initial values
  title: "Initial Consultation",
  fields: {
    horseName: {
      label: "Horse name",
      defaultValue: "",
    },
    clientSurname: {
      label: "Client surname",
      defaultValue: "",
    },
    dateOfCastration: {
      label: "Date of castration",
      defaultValue: "",
    },
    isLessThanTwo: {
      label: "Age less than two years?",
      defaultValue: false,
    },
    ageAboveTwo: {
      label: "Age in years(for animals above 2 to 10 and above)",
      defaultValue: 0,
    },
    weight: {
      label: "Weight (kgs)",
      defaultValue: 0,
    },
    breed: {
      label: "Breed",
      options: [
        "TB or TB cross",
        "WB or WB cross",
        "Draft or draft cross",
        "Cob",
        "Pony",
        "Miniature breed",
        "Donkey",
      ],
      defaultValue: "",
    },
    technique: {
      label: "Technique",
      options: [
        "Tunica vaginalis removed (open technique)",
        "Tunica vaginalis removed (closed technique)",
        "Tunica vaginalis incised then removed (semi-closed)",
        "Other technique e.g. Henderson tool, laparoscopic",
      ],
      defaultValue: "",
    },
    locationTesticleLeft: {
      label: "Left testicle location",
      options: ["Normal", "Inguinal", "Abdominal"],
      defaultValue: "",
    },
    locationTesticleRight: {
      label: "Right Testicle location",
      options: ["Normal", "Inguinal", "Abdominal"],
      defaultValue: "",
    },
    ligatureUsed: {
      label: "Ligature used",
      options: ["Yes", "No"],
      defaultValue: "",
    },
    skinClosure: {
      label: "Skin closure",
      options: ["Open", "Sutures", "Staples", "Sub-cut", "Other"],
      defaultValue: "",
    },
    restraint: {
      label: "Restraint",
      options: [
        {
          option: "GA",
        },
        {
          option: "Standing",
          labels: ["Xylazine", "Detomidine", "Romifidine"],
        },
      ],
      defaultValue: "",
    },
  },
};

// Grab initial state/default values
// E.g. { horseName : "" , clientSurname : "" ....}
const ICStoreInitialState = Object.fromEntries(
  Object.entries(InitialConsultationForm.fields).map(
    ([key, { defaultValue }]) => [key, defaultValue]
  )
);

// Create a globally available store
export const InitialConsultationStore = new Store(ICStoreInitialState);

export const ResetInitialConsultationStore = () =>
  InitialConsultationStore.replace(ICStoreInitialState);
