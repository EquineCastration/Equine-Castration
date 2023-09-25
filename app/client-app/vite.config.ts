import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import pluginRaw from "vite-plugin-raw";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react(), tsconfigPaths(), pluginRaw({ match: /\.md$/ })],
  };

  switch (mode) {
    case "development": {
      const proxyTarget = "http://localhost:7735";
      return {
        ...config,
        server: {
          port: 45577,
          proxy: {
            "/api": {
              target: proxyTarget,
              secure: false,
            },
          },
        },
      };
    }
    default:
      return config;
  }
});
