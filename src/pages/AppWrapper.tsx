import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NativeEventEmitter, NativeModules } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "../navigators/DrawerNavigator";

import { Provider, useAtomValue } from "jotai";
import { activeThemeAtom } from "../helpers/jotai/atoms";

import { readImportedJSON } from "../db/fileSystem/fsRead";
import { importJSON } from "../db/fileSystem/fsWrite";

const AppWrapper = () => {

  const activeTheme = useAtomValue(activeThemeAtom);

  const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: activeTheme.backgroundPrimary,
    },
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    const eventListener = eventEmitter.addListener("ShareIntent", (event) => {
      const { type, data, fileName } = event;

      async function handleImportFileFromIntent() {
        const fileContents = await readImportedJSON(data);
        // TODO
        // test if file matches the program schema
        importJSON(fileName, fileContents, true);
      }
      handleImportFileFromIntent();
    })

    return () => {
      eventListener.remove();
    }
  }, []);

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
