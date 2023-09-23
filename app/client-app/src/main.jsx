import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./themes/theme";
import "config/i18n";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BackendApiProvider } from "./contexts/BackendApi";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense
            fallback={
              <Flex justify="center" w="100%" my={16}>
                <Spinner boxSize={16} />
              </Flex>
            }
          >
            <BackendApiProvider>
              <Root />
            </BackendApiProvider>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
