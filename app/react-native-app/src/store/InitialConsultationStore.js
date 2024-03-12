import { Store } from "pullstate";
import { initialConsultation } from "constants/initial-consultation";

/**
 * helper function to get default values for the fields. also works with nested objects
 * @param {*} fields - fields object
 * @returns - key value pair of fields with default values
 */
const getDefaultValues = (fields) => {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(value, "defaultValue")) {
        return [key, value.defaultValue];
      } else if (typeof value === "object") {
        return [key, getDefaultValues(value)];
      } else {
        return [key, null];
      }
    })
  );
};

const storeInitialState = getDefaultValues(initialConsultation.fields);

/**
 * store for initial consultation form
 */
export const initialConsultationStore = new Store(storeInitialState);

/**
 * helper function to reset the store to initial state
 * @returns - reset the initial consultation store to initial state
 */
export const resetInitialConsultationStore = () =>
  initialConsultationStore.replace(storeInitialState);

/**
 * helper function to update the initial consultation store. works with nested objects.
 * @param {*} data - data to update the store with
 */
export const updateInitialConsultationStore = (data) => {
  initialConsultationStore.update((store) => {
    const updateStore = (store, data) => {
      Object.keys(data).forEach((key) => {
        if (
          typeof data[key] === "object" &&
          data[key] !== null &&
          !Array.isArray(data[key])
        ) {
          if (!store[key]) store[key] = {};
          updateStore(store[key], data[key]);
        } else {
          store[key] = data[key];
        }
      });
    };
    updateStore(store, data);
  });
};
