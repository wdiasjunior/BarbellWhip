import React, { useState, useEffect, useLayoutEffect, } from "react";
import { Text, View, Switch, TouchableOpacity, SafeAreaView, ScrollView, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./settingsPageStyles";

import { useAtom } from "jotai";
import { activeThemeIdAtom, activeThemeAtom, selectedLocaleIdAtom, selectedLocaleAtom } from "../../helpers/jotai/atomsWithStorage";

import { themes } from "../../themes/";
import { locales } from "../../db/locales/";

const SettingsPage = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [activeThemeId, setActiveThemeId] = useAtom(activeThemeIdAtom);

  const [selectedLocale, ] = useAtom(selectedLocaleAtom);
  const [selectedLocaleId, setSelectedLocaleId] = useAtom(selectedLocaleIdAtom);

  return (
    <View style={styles(activeTheme).container}>
        {/*<Text style={styles(activeTheme).title}>Settings Page</Text>*/}

        {/* TODO */}
        {/*<Text style={styles(activeTheme).subtitle}>
          Weights are rounded to 2.5kg so that it's easier on the head mid training session, and it's applied in every screen.
          In the future, it will be added a toggle so that you can disable this behaviour.

          enable rounding of 1rm estimates and 1rm percentages?
          global setting? 1 switch of each per page?
        </Text>*/}

        {/*<Text style={styles(activeTheme).subtitle}>Calculation Formulas - Select the formulas used to calculate your 1RM</Text>*/}

        <View style={styles(activeTheme).themeSelectorContainer}>
          <Text style={styles(activeTheme).themeSelectorTitle}>{selectedLocale.settingsPage.languageSelectorTitle}:</Text>
          {locales.map((locale, index) => {
            return (
              <TouchableOpacity
                style={styles(activeTheme).themeSelectorItem}
                key={index + "" + locale.id}
                onPress={() => setSelectedLocaleId(locale.id)}
              >
                <View style={styles(activeTheme).themeSelectorIconContainer}>
                  {locale.id === selectedLocaleId &&
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      style={styles(activeTheme).themeSelectorIcon}
                    />
                  }
                </View>
                <Text style={styles(activeTheme).themeSelectorItemText}>{locale.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={styles(activeTheme).themeSelectorContainer}>
          <Text style={styles(activeTheme).themeSelectorTitle}>Theme:</Text>
          {themes.map((theme, index) => {
            return (
              <TouchableOpacity
                style={styles(activeTheme).themeSelectorItem}
                key={index + "" + theme.id}
                onPress={() => setActiveThemeId(theme.id)}
              >
                <View style={styles(activeTheme).themeSelectorIconContainer}>
                  {theme.id === activeThemeId &&
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      style={styles(activeTheme).themeSelectorIcon}
                    />
                  }
                </View>
                <Text style={styles(activeTheme).themeSelectorItemText}>{theme.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
    </View>
  );
}

export default SettingsPage;
