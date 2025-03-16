import React, { useState, useEffect } from "react";
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

  


  return (
    <View style={styles(activeTheme).container}>
      <View style={styles(activeTheme).rowContainer}>
        <Text style={styles(activeTheme).title}>{selectedLocale.openBarbellPage.title}</Text>
      </View>
    </View>
  );
}

export default OpenBarbellPage;
