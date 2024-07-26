import "react-native-gesture-handler";
import React, { Suspense } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";

import AppWrapper from "./src/pages/AppWrapper";

export default function App() {

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#ECEFF4" />
        </View>
      }
    >
      <AppWrapper />
    </Suspense>
  );
}
