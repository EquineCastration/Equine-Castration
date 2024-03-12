import { InitialConsultationStore as Store } from "store/InitialConsultationStore";
import set from "lodash/set";
/**
 * Get the initial values for the formik form
 * @param {*} keysArr - an array of field names, which should match with the store obj keys
 * @returns - an object with key value pairs of the fields and their values
 */

export const useInitialValues = (keysArr) => {
  const result = {};

  const search = (keysArr, obj, path = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      if (keysArr.includes(newPath)) {
        set(result, newPath, value);
      }
      if (typeof value === "object" && value !== null) {
        search(keysArr, value, newPath);
      }
    });
  };

  search(keysArr, Store.useState());
  return result;
};
