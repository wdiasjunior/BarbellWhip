import React, { useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import styles from "./openBarbellPageStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";

const OpenBarbellPage = ({ navigation }) => {

  // react-native-ble-manager
  // react-native-charts-wrapper
  // react-native-device-info?
  // moment?

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      <View style={s.rowContainer}>
        <Text style={s.title}>{selectedLocale.openBarbellPage.title}</Text>
      </View>
    </View>
  );
}

export default OpenBarbellPage;
