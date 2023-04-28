import { Store } from "pullstate";
import { initialConsultation } from "constants/initial-consultation";

// Grab initial state/default values
// E.g. { horseName : "" , clientSurname : "" ....}
export const ICStoreInitialState = Object.fromEntries(
  Object.entries(initialConsultation.fields).map(([key, { defaultValue }]) => [
    key,
    defaultValue,
  ])
);

// Create a globally available store
export const InitialConsultationStore = new Store(ICStoreInitialState);

export const resetInitialConsultationStore = () =>
  InitialConsultationStore.replace(ICStoreInitialState);
