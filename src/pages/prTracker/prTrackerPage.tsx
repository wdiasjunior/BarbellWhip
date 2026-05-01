import React, { useMemo } from "react";
import { Text, View } from "react-native";

import styles from "./prTrackerPageStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";

const PRTrackerPage = ({ navigation }) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      <View style={s.content}>
        <Text style={s.title}>PR Tracker Page</Text>
        <Text style={s.subtitle}>Display some fancy graphs/charts</Text>
      </View>
    </View>
  );
}

export default PRTrackerPage;
