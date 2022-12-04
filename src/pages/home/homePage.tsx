import React, { useState, useEffect, } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';

import styles from './homePageStyles';

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

const HomePage = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

  return (
      <View style={styles(activeTheme).container}>
        <View style={styles(activeTheme).content}>
          <Text style={styles(activeTheme).title}>Home Page</Text>
          <Text style={styles(activeTheme).subtitle}>Vai mesmo ter uma home?</Text>
        </View>
      </View>
  );
}

export default HomePage;
