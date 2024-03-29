# BarbellWhip

BarbellWhip is a Free and Open Source workout management app made with the
complexity of percentage based powerlifting training programs in mind, aiming to
replace the use of spreadsheets while also providing features such as RM and
plate calculators and a program editor.

Built with React Native, and currently only supported on Android.

For iOS users or whoever wants to test the app without downloading it, there's an experimental web version available at https://web.barbellwhip.com/, and the source code for it is available [here](https://github.com/wdiasjunior/barbellwhip-web).

<img src="appOverview.gif" alt="appOverview" width="300"/>

## How to run

Using node version `v18.12.1` install the dependencies by running `npm i`.

In one terminal run the command below

`npx react-native start`

And in another terminal run the following commands

`export JAVA_HOME='/usr/lib/jvm/java-11-openjdk'`

`export ANDROID_SDK_ROOT='/home/$USER/Android/Sdk'`

`npx react-native run-android`

## How to build (debug apk)

Run the command below in the project's root directory

`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

Then run the commands below in the `/android` directory

`export JAVA_HOME='/usr/lib/jvm/java-11-openjdk'`

`export ANDROID_SDK_ROOT='/home/$USER/Android/Sdk'`

`./gradlew assembleDebug`

## Contributing

Read the contributing guide [here](CONTRIBUTING.md).
