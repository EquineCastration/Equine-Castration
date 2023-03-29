import { LinearGradient } from "expo-linear-gradient";
export const BgGradient = ({ children }) => {
  return (
    <LinearGradient
      colors={["#38B2AC", "#1A365D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {children}
    </LinearGradient>
  );
};
