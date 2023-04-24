import 'react-native-gesture-handler';
import React, { Suspense } from "react";
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';

import AppWrapper from './src/pages/AppWrapper';

// import { Provider, useAtom } from "jotai";
// import { loadable } from "jotai/utils";
// import { activeThemeAtom } from "./src/helpers/jotai/atomsWithStorage";

export default function App() {

  // const loadableAtom = loadable(activeThemeAtom)
  // const [activeTheme, ] = useAtom(loadableAtom);
  // console.log(activeTheme);

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: "center" }}>
        {/*
            <View style={{ backgroundColor: activeTheme?.data?.backgroundPrimary, flex: 1, justifyContent: "center" }}>
            <View style={{ backgroundColor: activeTheme.backgroundPrimary, flex: 1, justifyContent: "center" }}>
            "A component suspended while responding to synchronous input."
            This causes the loading screen to be a fixed color that is not the activeTheme backgroundPrimary
            maybe try react-native-mmkv, since it is synchronous and much faster than AsyncStorage
        */}
          <ActivityIndicator size="large" color="#ECEFF4" />
        </View>
      }
    >
      <AppWrapper />
    </Suspense>
  );
}
