export const initialConsultation = {
  // The followings are relevant elements for InitialConsultation Form
  // These are being used in the form
  // as field name, field label, field options and in formik initial values
  title: "Initial Consultation",
  fields: {
    id: {
      label: "Case Id",
    },
    horseName: {
      label: "Horse name",
      defaultValue: "",
    },
    clientSurname: {
      label: "Client surname",
      defaultValue: "",
    },
    clientEmail: {
      label: "Client email",
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
        "Other",
      ],
      defaultValue: "",
    },
    techniqueOther: {
      label: "Other Technique e.g. Henderson tool, laparoscopic",
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
    skinClosureOther: {
      label: "Other Skin closure",
      defaultValue: "",
    },
    restraint: {
      label: "Restraint",
      options: ["GA", "Standing"],
      defaultValue: "",
    },
    restraintStanding: {
      label: "Restraint Standing",
      options: ["Xylazine", "Detomidine", "Romifidine"],
      defaultValue: "Xylazine",
    },
    environment: {
      label: "Environment",
      options: ["Hot", "Wet", "Muddy", "Other"],
      defaultValue: [],
    },
    environmentOther: {
      label: "Environment other",
      defaultValue: "",
    },

    location: {
      label: "Location",
      options: ["Stable", "Field", "School", "Theatre", "Other"],
      defaultValue: "",
    },
    locationOther: {
      label: "Other Location",
      defaultValue: "",
    },
    patientCleanliness: {
      label: "Patient Cleanliness",
      options: ["Poor", "Good", "Excellent", "Other"],
      defaultValue: "",
    },
    patientCleanlinessOther: {
      label: "Other Patient Cleanliness",
      defaultValue: "",
    },
    environmentCleanliness: {
      label: "Environment Cleanliness",
      options: ["Poor", "Good", "Excellent", "Other"],
      defaultValue: "",
    },
    environmentCleanlinessOther: {
      label: "Other Environment Cleanliness",
      defaultValue: "",
    },
    patientCompliance: {
      label: "Patient Compliance",
      options: ["Poor", "Good", "Excellent", "Other"],
      defaultValue: "",
    },
    patientComplianceOther: {
      label: "Other Patient Compliance",
      defaultValue: "",
    },
  },
};
