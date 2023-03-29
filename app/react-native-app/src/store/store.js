import { Store } from "pullstate";

export const ICStoreInitialState = {
  horseName: "",
  clientSurname: "",
  dateOfCastration: "",
  isLessThanTwo: false,
  ageAboveTwo: 0,
  weight: 0,
  breed: "",
  technique: "",
  progress: 0,
};
export const InitialConsulationStore = new Store(ICStoreInitialState);
