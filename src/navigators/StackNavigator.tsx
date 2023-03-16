import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import ProgramPage from "../pages/program/programPage";
import ExerciseItemPage from "../pages/program/subPages/exerciseItemPage/exerciseItemPage";
import RMReviewPage from "../pages/program/subPages/rmReviewPage/rmReviewPage";

import PlateMathPage from "../pages/plateMath/plateMathPage";
import WeightRackPage from "../pages/plateMath/weightRackPage/weightRackPage";

import ProgramEditorPage from "../pages/programEditor/programEditorPage";
// import { BottomTabProgramEditorPageNavigator } from "./TabNavigator";

const Stack = createStackNavigator();

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StepOne from "../pages/programEditor/subPages/stepOne/stepOne";
import StepTwo from "../pages/programEditor/subPages/stepTwo/stepTwo";
import StepThree from "../pages/programEditor/subPages/stepThree/stepThree";
import ExerciseEditorPage from "../pages/programEditor/subPages/stepThree/exerciseEditorPage/exerciseEditorPage";

import { useAtom } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../helpers/jotai/atomsWithStorage";

const ProgramEditorDayPageStack = () => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        cardStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
          opacity: 1,
        },
        sceneContainerStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: activeTheme.backgroundPrimary,
      }}
    >
      <Stack.Screen
        name="DaysStack"
        component={StepThree}
        options={{
          headerShown: true,
          headerLeft: null,
          headerStyle:{
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />
      <Stack.Screen
        name="ExerciseEditorPage"
        component={ExerciseEditorPage}
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: selectedLocale.programEditorPage.exerciseEditorPage.title,
          animationEnabled: false,
          headerStyle:{
            backgroundColor: activeTheme.backgroundSecondary,
          },
          headerTintColor: activeTheme.text,
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const BottomTabProgramEditorPageNavigator = () => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#3da9db",
        tabBarInactiveTintColor: "#808080",
        tabBarIconStyle: { display: "none" },
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15,
          position: "relative",
          left: -10,
        },
        tabBarStyle: {
          display: (navigation?.getState()?.routes[1]?.state?.routes[2]?.state?.routes[1]?.name === "ExerciseEditorPage") ? "none" : "flex",
          backgroundColor: activeTheme.backgroundSecondary,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: activeTheme.active,
        tabBarInactiveTintColor: activeTheme.inactive,
      })}
      sceneContainerStyle={{
        backgroundColor: activeTheme.backgroundPrimary,
      }}
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
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
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
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
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
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ProgramPageStack = () => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        cardStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
          opacity: 1,
        },
        sceneContainerStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: activeTheme.backgroundPrimary,
      }}
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
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
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
          animationEnabled: false,
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
        options={{
          headerShown: true,
          presentation: "modal",
          detachPreviousScreen: false,
          headerTitle: selectedLocale.programPage.rmReviewTitle,
          animationEnabled: false,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
    </Stack.Navigator>
  );
}

const PlateMathPageStack = () => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        cardStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
          opacity: 1,
        },
        sceneContainerStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: activeTheme.backgroundPrimary,
      }}
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
          cardStyle: {
            backgroundColor: activeTheme.backgroundPrimary,
            opacity: 1,
          },
        }}
      />
      <Stack.Screen
        name="WeightRackPage"
        component={WeightRackPage}
        options={{
          headerShown: true,
          presentation: "modal",
          detachPreviousScreen: false,
          headerTitle: selectedLocale.plateMathPage.weightRackPage.title,
          animationEnabled: false,
          headerStyle: {
            backgroundColor: activeTheme.backgroundSecondary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: activeTheme.text,
        }}
      />
    </Stack.Navigator>
  );
}

const ProgramEditorPageStack = () => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        cardStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
          opacity: 1,
        },
        sceneContainerStyle: {
          backgroundColor: activeTheme.backgroundPrimary,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: activeTheme.backgroundPrimary,
      }}
    >
      <Stack.Screen
        name="ProgramEditorStack"
        component={ProgramEditorPage}
        options={{
          headerShown: true,
          headerLeft: null,
          title: selectedLocale.programEditorPage.title,
          headerTitle: selectedLocale.programEditorPage.title,
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
      <Stack.Screen
        name="StepsTabs"
        component={BottomTabProgramEditorPageNavigator}
        options={({ route }) => {
          return {
            // headerShown: navigation?.getState()?.routes[1]?.state?.routes[1]?.state?.routes[2]?.state?.routes[1]?.name !== "ExerciseEditorPage",
            headerShown: false,
            presentation: "modal",
            headerTitle: selectedLocale.programEditorPage.programEditorStep1.title,
            animationEnabled: false,
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
          }
        }}
      />
    </Stack.Navigator>
  );
}

export { ProgramPageStack, ProgramEditorPageStack, PlateMathPageStack };
