import { Store } from "pullstate";
import { accountRegistration } from "constants/account-registration";

// Grab initial state/default values
// E.g. { name : "" , email : "" ....}
export const AccRegistrationStoreInitialState = Object.fromEntries(
  Object.entries(accountRegistration.fields)
    .filter(([key]) => key !== "id") // ignore specific keys
    .map(([key, { defaultValue }]) => [key, defaultValue])
);

// Create a globally available store
export const AccountRegistrationStore = new Store(
  AccRegistrationStoreInitialState
);

export const resetAccountRegistrationStore = () =>
  AccountRegistrationStore.replace(AccRegistrationStoreInitialState);
