# BarbellWhip

## How to run

using node version `v18.12.1` install the dependencies running `npm i`.

in one terminal run the command below

`npx react-native start`

and in another terminal run the commands below

`export JAVA_HOME='/usr/lib/jvm/java-11-openjdk/'`

`export ANDROID_SDK_ROOT='/home/$USER/Android/Sdk'`

`npx react-native run-android`

## How to build

run this command in the project's root directory

`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

then run the commands below in the `/android/` directory

`export JAVA_HOME='/usr/lib/jvm/java-11-openjdk/'`

`./gradlew assembleDebug`
