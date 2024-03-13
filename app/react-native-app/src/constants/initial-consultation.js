/**
 * The followings are relevant elements for InitialConsultation Form.
 * These are being used in the form for setting field name, field label, field options
 */
const horseInformation = {
  fields: {
    id: {
      label: "Horse Id",
    },
    name: {
      label: "Horse name",
      defaultValue: "",
    },
    dateOfCastration: {
      label: "Date of castration",
      defaultValue: "",
    },
    age: {
      label: "Age of horse",
      defaultValue: 0,
    },
    weight: {
      label: "Estimated Weight (kgs)",
      defaultValue: 0,
    },
    breed: {
      label: "Breed",
      options: [
        "Thoroughbred or Thoroughbred X",
        "Warmblood or Warmblood X",
        "Draft or Draft X",
        "Standardbred or Standardbred X",
        "Cob or Cob X",
        "Sports Horse or Sports Horse X",
        "Friesian or Friesian X",
        "Arab or Arab X",
        "Connemara or Connemara X",
        "Icelandic or Icelandic X",
        "Pony",
        "Miniature Breed",
        "Donkey",
        "Other",
      ],
      defaultValue: "",
    },
    breedOther: {
      label: "If other breed, please specify",
      defaultValue: "",
    },
    isClinicallyHealthy: {
      label: "Is the horse clinically healthy?",
      defaultValue: true,
    },
    isClinicallyHealthyNo: {
      label: "If no, please describe the abnormal clinical findings",
      defaultValue: "",
    },
    isOnMedication: {
      label: "Is the horse on any medication?",
      defaultValue: false,
    },
    isOnMedicationYes: {
      label: "Is yes, please note the medication",
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
    deceased: {
      label: "Deceased",
      defaultValue: false,
    },
  },
};

export const initialConsultation = {
  title: "Initial Consultation",
  fields: {
    id: {
      label: "Case Id",
    },
    clientEmail: {
      label: "Client email",
      defaultValue: "",
    },

    // Surgical technique
    localAnaestheticUsed: {
      label: "Local Anaesthetic Used",
      defaultValue: false,
    },
    parietalTunicIncised: {
      label:
        "The parietal tunic was incised during surgery, prior to emasculation",
      defaultValue: false,
    },
    portionParietalTunicRemoved: {
      label: "A portion of the parietal tunic was removed during surgery.",
      defaultValue: false,
    },
    emasculatorsUsed: {
      label: "Emasculators used.",
      defaultValue: false,
    },
    emasculatorsHeldDurationMinutes: {
      label: "If yes, how long were the emasculators held in place (minutes)?",
      defaultValue: 0,
    },
    ligaturesUsedToCloseParietalTunic: {
      label: "Were ligatures used to close the parietal tunic?",
      defaultValue: false,
    },
    ligaturesUsedToCloseParietalTunicYes: {
      label: "If yes, how many ligatures?",
      options: [
        "1 ligature",
        "2 ligatures",
        "Simple continuous suture pattern",
        "Other",
      ],
      defaultValue: "",
    },
    ligaturesUsedToCloseParietalTunicYesOther: {
      label: "If yes and other, please specify",
      defaultValue: "",
    },
    ligaturesPlacedAroundVasculatureOnly: {
      label:
        "Were ligatures placed around the vasculature only and the parietal tunic remained open.",
      defaultValue: false,
    },
    ligaturesPlacedAroundVasculatureOnlyYes: {
      label: "If yes, how many ligatures?",
      options: ["1 ligature", "2 ligatures", "Other"],
      defaultValue: "",
    },
    ligaturesPlacedAroundVasculatureOnlyYesOther: {
      label: "If yes and other, please specify",
      defaultValue: "",
    },
    skinClosure: {
      label: "Skin closure",
      options: ["Open", "Primary closure", "Partial closure"],
      defaultValue: "",
    },
    skinClosurePrimaryOrPartial: {
      label:
        "If primary closure or partial closure then what type of suture pattern was used?",
      options: ["Sutures", "Staples"],
      defaultValue: "",
    },

    // Preoperative management
    preoperativeAnalgesiaGiven: {
      label: "Preoperative analgesia given?",
      defaultValue: false,
    },
    preoperativeAnalgesiaGivenYes: {
      label: "If yes, please choose one or more",
      options: [
        "Butorphanol",
        "Firocoxib",
        "Meloxicam",
        "Morphine",
        "Phenylbutazone",
        "Other",
      ],
      defaultValue: [],
    },
    preoperativeAnalgesiaGivenYesOther: {
      label: "If preoperative analgesia given is other, please specify",
      defaultValue: "",
    },

    preoperativeAntimicrobialsGiven: {
      label: "Preoperative antimicrobials given?",
      defaultValue: false,
    },
    preoperativeAntimicrobialsGivenYes: {
      label: "If yes, please choose one or more",
      options: [
        "Ceftiofur",
        "Doxycycline",
        "Enrofloxacin",
        "Gentamicin",
        "Metronidazole",
        "Neomycin/penicillin",
        "Oxytetracycline",
        "Penicillin",
        "Streptomycin/penicillin",
        "Trimethoprim Sulphadiazine",
        "Other",
      ],
      defaultValue: [],
    },
    preoperativeAntimicrobialsGivenYesOther: {
      label: "If preoperative antimicrobials given is other, please specify",
      defaultValue: "",
    },

    antimicrobialAdminTiming: {
      label:
        "Timing of antimicrobial administration (minutes before start of surgery)",
      defaultValue: 0,
    },

    // Postoperative management
    postoperativeAnalgesiaGiven: {
      label: "Postoperative analgesia given?",
      defaultValue: false,
    },
    postoperativeAnalgesiaGivenYes: {
      label: "If yes, please choose one or more",
      options: [
        "Flunixin meglumine",
        "Firocoxib",
        "Meloxicam",
        "Morphine",
        "Phenylbutazone",
        "Other",
      ],
      defaultValue: [],
    },
    postoperativeAnalgesiaGivenYesOther: {
      label: "If postoperative analgesia given is other, please specify",
      defaultValue: "",
    },
    postoperativeAnalgesiaGivenDays: {
      label: "Postoperative analgesia given for how many days?",
      defaultValue: 0,
    },

    postoperativeAntimicrobialsGiven: {
      label: "Postoperative antimicrobials given?",
      defaultValue: false,
    },
    postoperativeAntimicrobialsGivenYes: {
      label: "If yes, please choose one or more",
      options: [
        "Ceftiofur",
        "Doxycycline",
        "Enrofloxacin",
        "Gentamicin",
        "Metronidazole",
        "Neomycin/penicillin",
        "Oxytetracycline",
        "Penicillin",
        "Streptomycin/penicillin",
        "Trimethoprim Sulphadiazine",
        "Other",
      ],
      defaultValue: [],
    },
    postoperativeAntimicrobialsGivenYesOther: {
      label: "If postoperative antimicrobials given is other, please specify",
      defaultValue: "",
    },
    postoperativeAntimicrobialsGivenDays: {
      label: "Postoperative antimicrobials given for how many days?",
      defaultValue: 0,
    },

    // Environment factors
    restraint: {
      label: "Restraint",
      options: ["GA", "Standing"],
      defaultValue: "",
    },
    location: {
      label: "Location",
      options: [
        "Hospital on surgical bed",
        "Hospital in recovery box",
        "Barn or Stable",
        "Field",
        "Other",
      ],
      defaultValue: "",
    },
    locationOther: {
      label: "Other Location",
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
    patientCleanliness: {
      label: "Patient Cleanliness",
      options: ["Poor", "Good", "Excellent", "Other"],
      defaultValue: "",
    },
    patientCleanlinessOther: {
      label: "Other Patient Cleanliness",
      defaultValue: "",
    },

    // Complications
    anyIntraoperativeComplications: {
      label: "Were there any intraoperative complications?",
      defaultValue: false,
    },
    anyIntraoperativeComplicationsYes: {
      label: "If yes, please describe any complications",
      defaultValue: "",
    },
    anyPostoperativeComplications: {
      label: "Were there any immediate postoperative complications?",
      defaultValue: false,
    },
    anyPostoperativeComplicationsYes: {
      label: "If yes, select complications (one or more)",
      options: [
        "Haemorrhage",
        "Intestinal evisceration",
        "Omental evisceration",
        "Subcutaneous tissue protrusion",
        "Penile damage",
        "Other",
      ],
      defaultValue: [],
    },
    anyPostoperativeComplicationsYesOther: {
      label: "If yes and other, please specify",
      defaultValue: "",
    },
    dischargeDate: {
      label: "Discharge date",
      defaultValue: "",
    },
    dischargeNote: {
      label: "Any discharge note",
      defaultValue: "",
    },
    horse: horseInformation.fields,
  },
};
