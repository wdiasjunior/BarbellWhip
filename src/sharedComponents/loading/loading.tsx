import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./loadingStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom } from "../../helpers/jotai/atoms";

const Loading = () => {

  const activeTheme = useAtomValue(activeThemeAtom);

  return (
    <View style={styles(activeTheme).container}>
      <ActivityIndicator size="large" color={activeTheme.textFaded} />
    </View>
  );
}

export default Loading;
