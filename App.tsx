import 'react-native-gesture-handler';
import React, { Suspense } from "react";
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import DrawerNavigator from './src/navigators/DrawerNavigator';

import { Provider } from 'jotai';

export default function App() {

  const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#171923"
    },
  };

  return (
    <Suspense
      fallback={
        <View style={{ backgroundColor: "#171923", flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#ECEFF4" />
        </View>
      }
    >
      <Provider>
          <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1a202c" />
          <NavigationContainer theme={navigatorTheme} >
            <DrawerNavigator />
          </NavigationContainer>
      </Provider>
    </Suspense>
  );
}
