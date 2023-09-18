import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import { theme } from "./themes/theme";
import "config/i18n";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BackendApiProvider } from "./contexts/BackendApi";

ReactDOM.render(
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
  </StrictMode>,
  document.getElementById("root")
);
