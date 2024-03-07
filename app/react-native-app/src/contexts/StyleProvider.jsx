import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { lightColourScheme, darkColourScheme } from "style";

const StyleContext = createContext({});
export const useStyle = () => useContext(StyleContext);

export const StyleProvider = ({ children }) => {
  const theme = useColorScheme();

  return (
    <StyleContext.Provider
      value={{
        colors: theme === "dark" ? darkColourScheme : lightColourScheme,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
