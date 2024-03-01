import { BackendApiProvider } from "contexts/BackendApiProvider";
import { BackendConfigProvider } from "contexts/Config";
import Toast from "react-native-toast-message";
import { toastConfig } from "style/style";
import { Suspense } from "react";
import { Spinner } from "components/Spinner";
import { UserProvider } from "contexts/User";
import { Navigation } from "navigation/Navigation";

export default function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <BackendApiProvider>
          <UserProvider>
            <BackendConfigProvider>
              <Navigation />
            </BackendConfigProvider>
          </UserProvider>
        </BackendApiProvider>
      </Suspense>
      <Toast config={toastConfig} />
    </>
  );
}
