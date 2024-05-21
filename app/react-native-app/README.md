### App Configuration

The React Native app can be configured via `.env` or an `.env.development.local`.

```bash
EXPO_PUBLIC_BACKEND_URL= # Backend URL that the app would connect to, e.g., 'http://localhost:5735'.
EXPO_PUBLIC_APP_IDENTIFIER_NAME= # The name of the request header used to identify the app, e.g., 'X-App-Identifier'. This header will be included in all API requests made by the app.
EXPO_PUBLIC_APP_IDENTIFIER= # The value of the app identifier header. This is used to verify that API requests are coming from the app.
```

**Note**: The EAS CLI adheres to the same rules as the Expo CLI when it comes to env variables. Therefore, only variables prefixed with `EXPO_PUBLIC` are recognised and read. This is particularly useful when building the app locally using the EAS CLI. For other cases, environment variables must be defined in the `eas.json` file. For more information, refer to the [Expo documentation on environment variables](https://docs.expo.dev/guides/environment-variables/).

### Running the app

The easiest way to run the app is on a physical device using the [Expo Go](https://expo.dev/go) app.

1. Start the development server with the following command:
   ```bash
   pnpx start
   ```
1. Scan the QR code that appears on the terminal. This will then launch the app on your device.

#### Running on iOS Simulator (requires Mac)

1. Install [Xcode](https://developer.apple.com/xcode/).
1. Install Xcode Command Line Tools
   - Open Xcode, then go to `Preferences` > `Locations`.
1. Install iOS Simulatore
   - Open `Xcode` > `Preferences` > `Components`.
1. Open the app on iOS Simulator with the following command:
   ```bash
   pnpx ios # directly or
   pnpx start # and then press `i`
   ```

#### Running on Android Emulator

1. Install [Android Studio](https://developer.android.com/studio).
1. Open Android Studio and install/verify Android SDK.
1. Set up an Android Virtual Device (AVD)
1. Open the app on Android Emulator with the following command:
   ```bash
   pnpx android #directly or
   pnpx start #and then press `a`
   ```
   **Note**: To enable interaction between a React Native app on an Android emulator/virtual device and a backend in a local dev environment, execute adb reverse tcp:[port] tcp:[port]. Ensure that the port matches the port where the local backend is running. ADB (Android Debug Bridge) should be included when installing Android Studio as part of the Android SDK.

For more details, refer to the [Set up development environment](https://docs.expo.dev/guides/local-app-development/#android) guide.

- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

### App Submission Workflow

1. Set [EAS](https://docs.expo.dev/eas/) (Expo Application Services) CLI:
   ```bash
   npm install -g eas-cli
   ```
1. Log in to [Expo](https://expo.dev/) account:
   ```bash
   eas login
   ```
1. Build your App using the appropriate profile configured in `eas.json`. More details [here](https://docs.expo.dev/build/introduction/):

   ```bash
   eas build --local \ # builds the app locally rather than using Expo's cloud
      --output=[OUTPUT_PATH/FILE_NAME] \ # build output location
      --platform=[android | ios] \ # android | ios (platform to build)
      --profile=[preview | production] # profile set in eas.json. Production to be used for submission
   ```

   Note: Before building the app:

   - Please ensure the **`versionCode`**(for android) or **`buildNumber`**(for ios) in `app.json` is updated to avoid duplicate version errors when submitting. More details [here](https://docs.expo.dev/build-reference/app-versions/).

1. Submit the build. More details [here](https://docs.expo.dev/submit/introduction/):
   ```bash
   eas submit # this will prompt you to select a platform for submission.
   # follow the prompt as required.
   ```
   Note: Currently, there is no CI/CD set up for the app submission. The app is built locally as described above. The [iOS build is submitted](https://docs.expo.dev/submit/ios/) using `eas submit` whereas android build is [manually](https://github.com/expo/fyi/blob/main/first-android-submission.md) uploaded to Google Play Store.
