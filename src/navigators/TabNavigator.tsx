import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import CalculatorPage from "../pages/calculator/calculatorPage";
import Loading from "../sharedComponents/loading/loading";

import { ProgramPageStack, PlateMathPageStack } from "./StackNavigator";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../helpers/useInitialRender";

const Tab = createBottomTabNavigator();

const BottomTabProgramPageNavigator = () => {

  const isInitialRender = useInitialRender();
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if(route.name === "1RM Calculator") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else if(route.name === "ProgramTab") {
            iconName = focused ? "list" : "list-outline";
          } else if(route.name === "Plate Math") {
            iconName = focused ? "barbell-sharp" : "barbell-sharp";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: activeTheme.active,
        tabBarInactiveTintColor: activeTheme.inactive,
        tabBarStyle: {
          backgroundColor: activeTheme.backgroundSecondary,
          borderTopWidth: 0,
          display: isInitialRender ? "none" : "flex",
        },
        cardStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
          opacity: 1,
          flex: 1,
        },
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
        component={CalculatorPage}
        options={{
          headerShown: true,
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
