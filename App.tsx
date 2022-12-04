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
      // background: "red"
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
        {/*<View style={{ backgroundColor: "red", flex: 1 }}>*/}
        {/*<Text>teste</Text>*/}
        {/* gambiarra to fix the dreaded react navigation white flicker on navigate */}
          <StatusBar translucent={false} barStyle="light-content" backgroundColor="#1a202c" />

          <NavigationContainer theme={navigatorTheme} >
            <DrawerNavigator />
          </NavigationContainer>
        {/*</View>*/}
      </Provider>
    </Suspense>
  );
}
