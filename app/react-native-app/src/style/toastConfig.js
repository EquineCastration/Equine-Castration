import { BaseToast, ErrorToast } from "react-native-toast-message";
import { colors } from "./colors";
import { typography } from "./typography";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.palette.success500 }}
      text1Style={text1Style}
      text1NumberOfLines={2}
    />
  ),
  error: (props) => (
    <ErrorToast {...props} text1Style={text1Style} text1NumberOfLines={2} />
  ),
};

const text1Style = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  fontWeight: "100", // this has no effect but required to use the custom font (only on Android)
};
