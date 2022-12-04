import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';

import { BottomTabProgramPageNavigator, BottomTabProgramEditorPageNavigator } from "./TabNavigator";
import { ProgramPageStack, ProgramEditorPageStack } from "./StackNavigator";
// import PRTrackerPage from '../pages/prTracker/prTrackerPage';
// import SettingsPage from "../pages/settings/settingsPage";
// import HomePage from "../pages/home/homePage";

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../helpers/useInitialRender";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const isInitialRender = useInitialRender();
  const [activeTheme, ] = useAtom(activeThemeAtom);

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      defaultStatus="closed"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ProgramDrawer') {
            iconName = focused ? 'barbell-sharp' : 'barbell-sharp';
          } else if (route.name === 'Program Editor') {
            iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
          // } else if (route.name === 'PR Tracker') {
          //   iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          // } else if (route.name === 'Home') {
          //   iconName = focused ? 'home' : 'home-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: activeTheme.active,
        drawerInactiveTintColor: activeTheme.inactive,
        drawerType: "back",
        lazy: true,
        drawerStyle: {
          backgroundColor: activeTheme.backgroundSecondary,
          width: isInitialRender ? null : "75%",
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
          title: "Program",
          headerStyle:{
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />
      <Drawer.Screen
        name="Program Editor"
        component={ProgramEditorPageStack}
        options={{
          headerShown: false,
          title: "Program Editor",
          headerStyle:{
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />
      {/*<Drawer.Screen name="Home" component={HomePage} />*/}
      {/*<Drawer.Screen name="PR Tracker" component={PRTrackerPage} />*/}
      {/*<Drawer.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerStyle:{
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />*/}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
