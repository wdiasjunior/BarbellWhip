import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "../navigators/DrawerNavigator";

import { Provider, useAtomValue } from "jotai";
import { activeThemeAtom } from "../helpers/jotai/atomsWithStorage";

const AppWrapper = () => {

  const activeTheme = useAtomValue(activeThemeAtom);

  const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: activeTheme.backgroundPrimary,
    },
  };

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
