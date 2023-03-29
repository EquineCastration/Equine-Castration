import { Store } from "pullstate";

export const InitialConsultationForm = {
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
      label: "Sking closure",
      options: ["Open", "Sutures", "Staples", "Sub-cut", "Other"],
      defaultValue: "",
    },
    restraint: {
      label: "Restraint",
      options: [
        {
          option: "Standing",
          labels: ["Xylazine", "Detomidine", "Detomidine"],
        },
        {
          option: "GA",
        },
      ],
      defaultValue: "",
    },
  },
};

// Grab initial state/default values
const ICStoreInitialState = Object.fromEntries(
  Object.entries(InitialConsultationForm.fields).map(
    ([key, { defaultValue }]) => [key, defaultValue]
  )
);

export const InitialConsultationStore = new Store(ICStoreInitialState);
