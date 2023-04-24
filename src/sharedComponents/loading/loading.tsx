import React from "react";
import { Text, View, ActivityIndicator } from "react-native";

import styles from "./loadingStyles";

import { useAtom } from "jotai";
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

const Loading = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

  return (
    <View style={styles(activeTheme).container}>
      <ActivityIndicator size="large" color={activeTheme.textFaded} />
    </View>
  );
}

export default Loading;
