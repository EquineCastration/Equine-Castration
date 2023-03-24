import { Store } from "pullstate";

export const InitialConsulationStore = new Store({
  horseName: "",
  clientSurname: "",
  dateOfCastration: "",
  isLessThanTwo: false,
  progress: 0,
});
