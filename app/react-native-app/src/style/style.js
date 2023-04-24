import { BaseToast, ErrorToast } from "react-native-toast-message";

export const font = {
  size: {
    xs: 12,
    sm: 14,
    normal: 16,
    md: 18,
    lg: 20,
    xl: 22,
    "2xl": 24,
    "3xl": 26,
    "4xl": 30,
    "5xl": 34,
    "6xl": 40,
  },
};

export const colors = {
  light: "#ffffff",
  error: "#d12608",
  success: "#00782a",
  primary: {
    50: "#ffffff",
    75: "#f5f6ff",
    100: "#e7e8ed",
    200: "#cfd0da",
    300: "#b7b9c8",
    400: "#9fa1b5",
    500: "#6f7391",
    600: "#575b7e",
    700: "#3f446c",
    800: "#272c59",
    900: "#0f1547",
  },
  secondary: {
    100: "#E6EAFB",
    200: "#CCD5F8",
    300: "#B3C0F4",
    400: "#9AABF1",
    500: "#8197ED",
    600: "#4E6DE6",
    700: "#3558E2",
    800: "#1B43DF",
    900: "#022EDB",
  },
  kanaka: {
    100: "#FAEDCE",
    200: "#F8E4B5",
    300: "#F6DB9D",
    400: "#F4D284",
    500: "#F1C96B",
    600: "#EFC053",
    700: "#EDB73A",
    800: "#EAAE22",
    900: "#e8a509",
  },
  patra: {
    100: "#CEE7D4",
    200: "#B5DABF",
    300: "#9DCEAA",
    400: "#84C295",
    500: "#6BB67F",
    600: "#53AA6A",
    700: "#3A9D55",
    800: "#22913F",
    900: "#0e7d2b",
  },
  ui: {
    bg: "#f8f8f8",
    border: "#e6e6e6",
    txt: "#b8b8b8",
    btnBg: "#246980",
    bgTransparent: "rgba(248, 248, 248, 0.8)", // transparent bg
  },
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.patra[700] }}
      text1Style={{
        fontSize: font.size["sm"],
        fontWeight: 300,
      }}
      text1NumberOfLines={2}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: font.size["sm"],
        fontWeight: 300,
      }}
      text1NumberOfLines={2}
    />
  ),
};
