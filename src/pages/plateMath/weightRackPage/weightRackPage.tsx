import React from "react";
import { Text, View, FlatList, Button, ScrollView, TouchableOpacity, } from 'react-native';

import styles from './weightRackPageStyles';

import { useAtom } from 'jotai';
import { activeThemeAtom, selectedLocaleAtom } from "../../../helpers/jotai/atomsWithStorage";

const WeightRackPage = () => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  return (
    <View style={styles(activeTheme).container}>
      <Text style={styles(activeTheme).title}>TODO -</Text>
      <Text style={styles(activeTheme).text}>weight unit switch</Text>
      {/*<Switch
        trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
        thumbColor={"#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setShowBumper}
        value={showBumper}
        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginTop: 10, }}
      />*/}
      <Text style={styles(activeTheme).text}>bumper plates switch</Text>
      <Text style={styles(activeTheme).text}>color coded plate view</Text>
      <Text style={styles(activeTheme).text}>2.5kg collars switch</Text>
      <Text style={styles(activeTheme).text}>weight rack input group</Text>
      <Text style={styles(activeTheme).text}>custom bars select input group and a custom</Text>
      <Text style={styles(activeTheme).text}>import/export plate math settings</Text>
    </View>
  );
}

export default WeightRackPage;
