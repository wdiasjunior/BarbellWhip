import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CalculatorPage from "../pages/calculator/calculatorPage";
import ProgramPage from "../pages/program/programPage";
import PlateMathPage from '../pages/plateMath/plateMathPage';
import Loading from '../sharedComponents/loading/loading';

import { ProgramPageStack } from "./StackNavigator";

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../helpers/useInitialRender";

const Tab = createBottomTabNavigator();

const BottomTabProgramPageNavigator = () => {

  const isInitialRender = useInitialRender();
  const [activeTheme, ] = useAtom(activeThemeAtom);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === '1RM Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'ProgramTab') {
            iconName = focused ? 'list' : 'list-outline';
          }
          else if (route.name === 'Plate Math') {
            iconName = focused ? 'barbell-sharp' : 'barbell-sharp';
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
        },
      })}
    >
      <Tab.Screen
        name="ProgramTab"
        component={isInitialRender ? Loading : ProgramPageStack}
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
          lazy: true,
        }}
      />
      <Tab.Screen
        name="1RM Calculator"
        component={CalculatorPage}
        options={{
          headerShown: true,
          title: "1RM Calculator",
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
      <Tab.Screen
        name="Plate Math"
        component={PlateMathPage}
        options={{
          headerShown: true,
          title: "Plate Math",
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
    </Tab.Navigator>
  );
};

export { BottomTabProgramPageNavigator };
