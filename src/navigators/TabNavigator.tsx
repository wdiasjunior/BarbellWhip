import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Loading from "../sharedComponents/loading/loading";

import { ProgramPageStack, PlateMathPageStack, CalculatorPageStack } from "./StackNavigator";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../helpers/jotai/atoms";

import { useInitialRender } from "../helpers/useInitialRender";

const Tab = createBottomTabNavigator();

const BottomTabProgramPageNavigator = () => {
  const isInitialRender = useInitialRender();
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const tabBarStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundSecondary,
    borderTopWidth: 0,
    display: isInitialRender ? "none" : "flex",
  }), [activeTheme.backgroundSecondary, isInitialRender]);

  const contentStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
    opacity: 1,
    flex: 1,
  }), [activeTheme.backgroundPrimary]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "1RM Calculator") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else if (route.name === "ProgramTab") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Plate Math") {
            iconName = focused ? "barbell-sharp" : "barbell-sharp";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: activeTheme.active,
        tabBarInactiveTintColor: activeTheme.inactive,
        tabBarStyle,
        contentStyle,
      })}
    >
      <Tab.Screen
        name="ProgramTab"
        component={isInitialRender ? Loading : ProgramPageStack}
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
      <Tab.Screen
        name="1RM Calculator"
        component={CalculatorPageStack}
        options={{
          headerShown: false,
          title: selectedLocale.calculatorPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
      <Tab.Screen
        name="Plate Math"
        component={PlateMathPageStack}
        options={{
          headerShown: false,
          title: selectedLocale.plateMathPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomTabProgramPageNavigator };
