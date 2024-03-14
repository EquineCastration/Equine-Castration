/**
 * @description - helper function that maps the values to the store. usefull for updating the store with form values.
 * @param {*} values - object with keys and values
 * @param {*} store - store object
 */
export const mapValuesToStore = (values, store) => {
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === "object") {
      if (!store[key]) {
        store[key] = {}; // empty object if it does not exist
      }
      Object.keys(values[key]).forEach((sKey) => {
        store[key][sKey] = values[key][sKey];
      });
    } else {
      store[key] = values[key];
    }
  });
};
