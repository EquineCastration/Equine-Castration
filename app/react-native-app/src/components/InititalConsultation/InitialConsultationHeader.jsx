import { Text, View } from "react-native";
import colors from "../../configs/colors";
import { BasicTouchableOpacity } from "../BasicTouchableOpacity";

export const InitialConsultationHeader = ({ backTarget }) => {
  return (
    <>
      {backTarget && (
        <BasicTouchableOpacity
          btnWidth="10%"
          bgColor="transparent"
          color="black"
          icon="arrow-back"
        />
      )}

      <View className={`${!backTarget ? "mt-24" : ""}`}>
        <Text className="font-bold text-4xl" style={{ color: colors.primary }}>
          Initial Consultation
        </Text>
        <Text className="font-normal text-xl" style={{ color: colors.lghtTxt }}>
          Input the following information
        </Text>
      </View>
    </>
  );
};
