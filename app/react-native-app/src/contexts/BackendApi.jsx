import { createContext, useContext } from "react";

export const BackendApiContext = createContext({});
export const useBackendApi = () => useContext(BackendApiContext);
