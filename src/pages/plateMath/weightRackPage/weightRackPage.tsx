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
      <Text style={styles(activeTheme).title}>{selectedLocale.plateMathPage.weightRackPage.title}</Text>
    </View>
  );
}

export default WeightRackPage;
