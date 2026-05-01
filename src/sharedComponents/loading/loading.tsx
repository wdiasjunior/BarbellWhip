import React, { useMemo } from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "./loadingStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom } from "../../helpers/jotai/atoms";

const Loading = () => {

  const activeTheme = useAtomValue(activeThemeAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color={activeTheme.textFaded} />
    </View>
  );
}

export default Loading;
