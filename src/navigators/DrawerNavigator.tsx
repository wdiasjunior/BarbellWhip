import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";

import { BottomTabProgramPageNavigator } from "./TabNavigator";
import { ProgramEditorPageStack, } from "./StackNavigator";
// import PRTrackerPage from "../pages/prTracker/prTrackerPage";
import SettingsPage from "../pages/settings/settingsPage";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../helpers/useInitialRender";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const isInitialRender = useInitialRender();
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      defaultStatus="closed"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "ProgramDrawer") {
            iconName = focused ? "barbell-sharp" : "barbell-sharp";
          } else if (route.name === "Program Editor") {
            iconName = focused ? "file-tray-full" : "file-tray-full-outline";
          // } else if (route.name === "PR Tracker") {
          //   iconName = focused ? "bar-chart" : "bar-chart-outline";
        } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: activeTheme.active,
        drawerInactiveTintColor: activeTheme.inactive,
        drawerType: "back",
        lazy: true,
        drawerStyle: {
          backgroundColor: activeTheme.backgroundSecondary,
          width: isInitialRender ? undefined : "75%",
        },
        cardStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
          opacity: 1,
        },
        sceneContainerStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
        },
      })}
    >
      <Drawer.Screen
        name="ProgramDrawer"
        component={BottomTabProgramPageNavigator}
        options={{
          headerShown: false,
          title: selectedLocale.programPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
      <Drawer.Screen
        name="Program Editor"
        component={ProgramEditorPageStack}
        options={{
          headerShown: false,
          title: selectedLocale.programEditorPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
      {/*<Drawer.Screen name="PR Tracker" component={PRTrackerPage} />*/}
      <Drawer.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          title: selectedLocale.settingsPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
