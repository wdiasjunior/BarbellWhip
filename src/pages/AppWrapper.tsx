import React, { useEffect, useMemo } from "react";
import { StatusBar } from "react-native";
import { NativeEventEmitter, NativeModules } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "../navigators/DrawerNavigator";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../helpers/jotai/atoms";

import { readImportedJSON } from "../db/fileSystem/fsRead";
import { importJSON } from "../db/fileSystem/fsWrite";

const AppWrapper = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const navigatorTheme = useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: activeTheme.backgroundPrimary,
    },
  }), [activeTheme.backgroundPrimary]);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    const eventListener = eventEmitter.addListener("ShareIntent", (event) => {
      const { type, data, fileName } = event;

      async function handleImportFileFromIntent() {
        const fileContents = await readImportedJSON(data, selectedLocale.fileSystem.errorReading);
        await importJSON(fileName, fileContents, true, selectedLocale.fileSystem.errorWriting);
        alert(selectedLocale.fileSystem.importSuccess);
      }

      handleImportFileFromIntent();
    })

    return () => {
      eventListener.remove();
    }
  }, []);

  return (
    <>
      <StatusBar
        translucent={false}
        barStyle={activeTheme.statusBar}
        backgroundColor={activeTheme.backgroundSecondary}
      />
      <NavigationContainer theme={navigatorTheme}>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
}

export default AppWrapper;
