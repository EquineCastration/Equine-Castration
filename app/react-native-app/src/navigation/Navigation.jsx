import { NavigationContainer } from "@react-navigation/native";
import { Account } from "./Account";
import { Home } from "./Home";
import { InitialConsultation } from "./InitialConsultation";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Account />
      <Home />
      <InitialConsultation />
    </NavigationContainer>
  );
};
