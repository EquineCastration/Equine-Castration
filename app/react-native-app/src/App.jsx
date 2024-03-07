import { BackendApiProvider } from "contexts/BackendApiProvider";
import { BackendConfigProvider } from "contexts/Config";
import Toast from "react-native-toast-message";
import { Suspense } from "react";
import { Spinner } from "components/Spinner";
import { UserProvider } from "contexts/User";
import { Navigation } from "navigation/Navigation";
import { useFonts } from "expo-font";
import { customFontsToLoad, toastConfig } from "style";
import { StyleProvider } from "contexts/StyleProvider";

export default function App() {
  const [areFontsLoaded] = useFonts(customFontsToLoad);
  if (!areFontsLoaded) return <Spinner />;
  return (
    <>
      <StyleProvider>
        <Suspense fallback={<Spinner />}>
          <BackendApiProvider>
            <UserProvider>
              <BackendConfigProvider>
                <Navigation />
              </BackendConfigProvider>
            </UserProvider>
          </BackendApiProvider>
        </Suspense>
      </StyleProvider>
      <Toast config={toastConfig} />
    </>
  );
}
