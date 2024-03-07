/**
 * Font style for the app.
 * This has been extracted from the ignite rn boilerplate project.
 **/

import { Platform } from "react-native";
import {
  Raleway_300Light as ralewayLight,
  Raleway_400Regular as ralewayRegular,
  Raleway_500Medium as ralewayMedium,
  Raleway_600SemiBold as ralewaySemiBold,
  Raleway_700Bold as ralewayBold,
} from "@expo-google-fonts/raleway";

export const customFontsToLoad = {
  ralewayLight,
  ralewayRegular,
  ralewayMedium,
  ralewaySemiBold,
  ralewayBold,
};

const fonts = {
  raleway: {
    // Cross-platform Google font.
    light: "ralewayLight",
    normal: "ralewayRegular",
    medium: "ralewayMedium",
    semiBold: "ralewaySemiBold",
    bold: "ralewayBold",
  },
  monospace: {
    normal: "monospace",
  },
};

export const typography = {
  fonts, // The fonts are available to use, but prefer using the semantic name.
  primary: fonts.raleway, // The default font for the app.
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }), // for code snippets
};
