const fs = require("fs");
const localtunnel = require("localtunnel");
const { spawn } = require("child_process");

const options = {
  port: 5735,
};

// Starts up Localtunnel
const initLocaltunnel = async () => {
  const tunnel = await localtunnel(options);

  tunnel.on("close", () => {
    console.log("Closing tunnel with url:", tunnel.url);
  });

  return tunnel;
};

// Spawns my React-Native subprocess
const spawnReactNativeProcess = (closeLocaltunnel) => {
  const process = spawn("pnpm", ["start"], { stdio: "inherit" });

  process.on("close", (code) => {
    console.log("React Native successfully shut down");
    closeLocaltunnel();
  });
};

// Run your automation script!
const run = async () => {
  const tunnel = await initLocaltunnel();

  await fs.promises.writeFile(
    ".env.development.local",
    `LOCAL_PUBLIC_API=${tunnel.url}`
  );

  // After creating env file, you can now start your React Native App to use it
  spawnReactNativeProcess(() => tunnel.close());
};

run();
