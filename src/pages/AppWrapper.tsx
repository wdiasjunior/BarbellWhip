import React, { useEffect } from 'react';
import { StatusBar } from "react-native";
// import { NativeEventEmitter, NativeModules } from 'react-native';

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "../navigators/DrawerNavigator";

import { Provider, useAtomValue } from "jotai";
import { activeThemeAtom } from "../helpers/jotai/atoms";

const AppWrapper = () => {

  const activeTheme = useAtomValue(activeThemeAtom);

  const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: activeTheme.backgroundPrimary,
    },
  };

  // useEffect(() => {
  //   const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
  //   const eventListener = eventEmitter.addListener('ShareIntent', (event) => {
  //     console.log('Received share intent data:', event);
  //     // Handle the shared data
  //     const { type, data } = event;
  //     // Do something with the data
  //     // TODO - save to fileSystem
  //   });
  //
  //   return () => {
  //     eventListener.remove();
  //   };
  // }, []);

  return (
    <Provider>
      <StatusBar
        translucent={false}
        barStyle={activeTheme.statusBar}
        backgroundColor={activeTheme.backgroundSecondary}
      />
      <NavigationContainer theme={navigatorTheme} >
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default AppWrapper;
