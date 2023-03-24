import { Text } from "react-native";

import colors from "../../configs/colors";

export const InitialConsultationHeader = () => {
  return (
    <>
      <Text className="font-bold text-4xl" style={{ color: colors.primary }}>
        Initial Consultation
      </Text>
      <Text className="font-normal text-xl" style={{ color: colors.lghtTxt }}>
        Input the following information
      </Text>
    </>
  );
};
