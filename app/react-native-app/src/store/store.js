import { Store } from "pullstate";

export const InitialConsulationStore = new Store({
  horseName: "",
  clientSurname: "",
  dateOfCastration: "",
  isLessThanTwo: false,
  ageAboveTwo: 0,
  weight: 0,
  breed: "",
  technique: "",
  progress: 0,
});
