import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProgramPage from "../pages/program/programPage";
import ExerciseItemPage from "../pages/program/subPages/exerciseItemPage/exerciseItemPage";
import RMReviewPage from "../pages/program/subPages/rmReviewPage/rmReviewPage";

import PlateMathPage from "../pages/plateMath/plateMathPage";
import WeightRackPage from "../pages/plateMath/weightRackPage/weightRackPage";

import ProgramEditorPage from "../pages/programEditor/programEditorPage";

const Stack = createStackNavigator();

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepOne from "../pages/programEditor/subPages/stepOne/stepOne";
import StepTwo from "../pages/programEditor/subPages/stepTwo/stepTwo";
import StepThree from "../pages/programEditor/subPages/stepThree/stepThree";
import ExerciseEditorPage from "../pages/programEditor/subPages/stepThree/exerciseEditorPage/exerciseEditorPage";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../helpers/jotai/atoms";

const backIconStyle = { marginLeft: 16, marginRight: 12 };
const tabBarLabelStyle = { fontWeight: "700" as const, fontSize: 15, position: "relative" as const, left: -10 };

const ProgramEditorDayPageStack = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const contentStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
    opacity: 1,
  }), [activeTheme.backgroundPrimary]);

  const sceneContainerStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
  }), [activeTheme.backgroundPrimary]);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        contentStyle,
        sceneContainerStyle,
      })}
    >
      <Stack.Screen
        name="DaysStack"
        component={StepThree}
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          contentStyle,
        }}
      />
      <Stack.Screen
        name="ExerciseEditorPage"
        component={ExerciseEditorPage}
        options={({ navigation }) => ({
          headerShown: true,
          presentation: "modal",
          headerTitle: selectedLocale.programEditorPage.exerciseEditorPage.title,
          headerTitleStyle: { color: activeTheme.text },
          animation: "none",
          headerLeft: () => (
            <Ionicons
              size={24}
              name="arrow-back-sharp"
              color={activeTheme.text}
              style={backIconStyle}
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
          },
          headerTintColor: activeTheme.text,
          contentStyle,
        })}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const BottomTabProgramEditorPageNavigator = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const navigation = useNavigation();

  const editorSceneContainerStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
  }), [activeTheme.backgroundPrimary]);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: activeTheme.active,
        tabBarInactiveTintColor: activeTheme.inactive,
        tabBarIconStyle: { display: "none" },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle,
        tabBarStyle: {
          display: (navigation?.getState()?.routes[1]?.state?.routes[2]?.state?.routes[1]?.name === "ExerciseEditorPage") ? "none" : "flex",
          backgroundColor: activeTheme.backgroundSecondary,
          borderTopWidth: 0,
        },
      })}
      sceneContainerStyle={editorSceneContainerStyle}
    >
      <Tab.Screen
        name="Info"
        component={StepOne}
        options={{
          tabBarLabel: selectedLocale.programEditorPage.programEditorStep1.tabTitle,
          headerShown: true,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Tab.Screen
        name="Weeks"
        component={StepTwo}
        options={{
          tabBarLabel: selectedLocale.programEditorPage.programEditorStep2.tabTitle,
          headerShown: true,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Tab.Screen
        name="Days"
        component={ProgramEditorDayPageStack}
        options={{
          tabBarLabel: selectedLocale.programEditorPage.programEditorStep3.tabTitle,
          headerShown: false,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ProgramPageStack = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const contentStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
    opacity: 1,
  }), [activeTheme.backgroundPrimary]);

  const sceneContainerStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
  }), [activeTheme.backgroundPrimary]);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        contentStyle,
        sceneContainerStyle,
      })}
    >
      <Stack.Screen
        name="ProgramStack"
        component={ProgramPage}
        options={{
          headerShown: true,
          title: selectedLocale.programPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
          contentStyle,
        }}
      />
      <Stack.Screen
        name="ExerciseItemPage"
        component={ExerciseItemPage}
        options={{
          headerShown: true,
          headerLeft: () => null,
          presentation: "modal",
          detachPreviousScreen: false,
          headerTitle: selectedLocale.programPage.exerciseInfo.title,
          headerTitleStyle: { color: activeTheme.text },
          animation: "none",
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
      <Stack.Screen
        name="RMReviewPage"
        component={RMReviewPage}
        options={({ navigation }) => ({
          headerShown: true,
          presentation: "modal",
          detachPreviousScreen: false,
          headerTitle: selectedLocale.programPage.rmReviewTitle,
          headerTitleStyle: { color: activeTheme.text },
          animation: "none",
          headerLeft: () => (
            <Ionicons
              size={24}
              name="arrow-back-sharp"
              color={activeTheme.text}
              style={backIconStyle}
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        })}
      />
    </Stack.Navigator>
  );
}

const PlateMathPageStack = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const contentStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
    opacity: 1,
  }), [activeTheme.backgroundPrimary]);

  const sceneContainerStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
  }), [activeTheme.backgroundPrimary]);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        animation: "none",
        contentStyle,
        sceneContainerStyle,
      })}
    >
      <Stack.Screen
        name="PlateMathPage"
        component={PlateMathPage}
        options={{
          headerShown: true,
          title: selectedLocale.plateMathPage.title,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
          contentStyle,
        }}
      />
      <Stack.Screen
        name="WeightRackPage"
        component={WeightRackPage}
        options={({ navigation }) => ({
          headerShown: true,
          presentation: "modal",
          detachPreviousScreen: false,
          headerTitle: selectedLocale.plateMathPage.weightRackPage.title,
          headerTitleStyle: { color: activeTheme.text },
          animation: "none",
          headerLeft: () => (
            <Ionicons
              size={24}
              name="arrow-back-sharp"
              color={activeTheme.text}
              style={backIconStyle}
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        })}
      />
    </Stack.Navigator>
  );
}

const ProgramEditorPageStack = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const contentStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
    opacity: 1,
  }), [activeTheme.backgroundPrimary]);

  const sceneContainerStyle = useMemo(() => ({
    backgroundColor: activeTheme.backgroundPrimary,
  }), [activeTheme.backgroundPrimary]);

  return (
    <Stack.Navigator
      screenOptions={() => ({
        contentStyle,
        sceneContainerStyle,
      })}
    >
      <Stack.Screen
        name="ProgramEditorStack"
        component={ProgramEditorPage}
        options={{
          headerShown: true,
          headerLeft: () => null,
          title: selectedLocale.programEditorPage.title,
          headerTitle: selectedLocale.programEditorPage.title,
          animation: "none",
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
          contentStyle,
        }}
      />
      <Stack.Screen
        name="StepsTabs"
        component={BottomTabProgramEditorPageNavigator}
        options={() => {
          return {
            headerShown: false,
            presentation: "modal",
            headerTitle: selectedLocale.programEditorPage.programEditorStep1.title,
            animation: "none",
            headerStyle: {
              backgroundColor: activeTheme.backgroundSecondary,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: activeTheme.text,
            contentStyle,
          }
        }}
      />
    </Stack.Navigator>
  );
}

export { ProgramPageStack, ProgramEditorPageStack, PlateMathPageStack };
