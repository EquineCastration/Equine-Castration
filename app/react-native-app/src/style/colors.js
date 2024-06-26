const palette = {
  primary100: "#F3F4F5",
  primary200: "#CFD4D8",
  primary300: "#9FA8B1",
  primary400: "#707D89",
  primary500: "#405162",
  primary: "#10263B",

  trentTurquoise100: "#F5FBFB",
  trentTurquoise200: "#D7F0EF",
  trentTurquoise300: "#AFE1DF",
  trentTurquoise400: "#87D2D0",
  trentTurquoise500: "#5FC3C0",
  trentTurquoise: "#37B4B0",

  forestGreen100: "#F2F7F5",
  forestGreen200: "#CCDFD7",
  forestGreen300: "#99BFAF",
  forestGreen400: "#669F86",
  forestGreen500: "#337F5E",
  forestGreen: "#005F36",

  rebelGold100: "#FDFBF3",
  rebelGold200: "#F8F0CD",
  rebelGold300: "#F2E19B",
  rebelGold400: "#EBD26A",
  rebelGold500: "#E5C338",
  rebelGold: "#DEB406",

  white100: "#FFFFFF",
  white300: "#F9F9F9",
  white500: "#F3F3F3",

  error100: "#FFD6D0",
  error400: "#d9462f",
  error500: "#d12608",

  success100: "#E9F7CC",
  success500: "#A9DD33",

  skyBlue100: "#009BC1",
  skyBlue500: "#0086a7",

  brand: "#32afb5",
};

/**
 * Colour scheme for the app.
 */

export const colors = {
  palette, // The palette is available to use, but prefer using the name.
  transparent: "rgba(248, 248, 248, 0.7)", // transparent bg, // A helper for making something see-thru.
  stone: palette.white100,
  sucess: palette.success500, // The default text color in many components.
  successBackground: palette.success100, // Success background color.
  active: palette.forestGreen500, // Active color.
  danger: palette.error500,
};

/**
 * Dark colour scheme.
 */
export const darkColourScheme = {
  text: palette.primary100, // Default text color in many components.
  textDim: palette.primary300, // Secondary text information.
  formLabel: palette.primary300, // Form label (primary) color.
  formOption: palette.primary400, // Form options/secondary label color.
  background: palette.primary, // Default color of the screen background.
  border: palette.primary500, // Default border color.
  tint: palette.primary300, // Main tinting color.
  separator: palette.primary500, // Subtle color used for lines.
  textLink: palette.brand, // Link color.
  button: palette.brand, // Default button color.
  error: palette.error100, // error text color.
  errorBackground: palette.error400, // Error background color.
  ...colors,
};

/**
 * Light colour scheme.
 */
export const lightColourScheme = {
  text: palette.primary, // Default text color in many components.
  textDim: palette.primary300, // Secondary text information.
  formLabel: palette.primary400, // Form label (primary) color.
  formOption: palette.primary300, // Form options/secondary label color.
  background: palette.white100, // Default color of the screen background.
  border: palette.primary200, // Default border color.
  tint: palette.primary400, // Main tinting color.
  separator: palette.primary200, // Subtle color used for lines.
  textLink: palette.brand, // Link color.
  button: palette.brand, // Default button color.
  error: palette.error500, // error text color.
  errorBackground: palette.error100, // Error background color.
  ...colors,
};
