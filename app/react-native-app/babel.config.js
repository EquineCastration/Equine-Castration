module.exports = function (api) {
  api.cache(true);

  const env = process.env.NODE_ENV;

  let envFile = ".env";
  if (env === "development") {
    envFile = ".env.development.local";
  }
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
        },
      ],
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "react-native-dotenv",
          path: envFile,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
