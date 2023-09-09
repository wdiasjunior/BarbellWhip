import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import UpdateModal from "../../sharedComponents/updateModal/updateModal";

import styles from "./settingsPageStyles";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeIdAtom,
  activeThemeAtom,
  selectedLocaleIdAtom,
  selectedLocaleAtom,
} from "../../helpers/jotai/atomsWithStorage";

import { themes } from "../../themes/";
import { locales } from "../../db/locales/";

import { version as currentAppVersion } from '../../../package.json';

const SettingsPage = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const [activeThemeId, setActiveThemeId] = useAtom(activeThemeIdAtom);

  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [selectedLocaleId, setSelectedLocaleId] = useAtom(selectedLocaleIdAtom);

  const [appVersionGithub, setAppVersionGithub] = useState<null | string>(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const getAppVersionGithub = () => {
    return fetch('https://raw.githubusercontent.com/wdiasjunior/BarbellWhip/main/package.json')
            .then(response => response.json())
            .then(json => setAppVersionGithub(json.version))
            .catch(error => console.error(error));
  }

  const handleUpdateModal = () => {
    setUpdateModalVisible(true);
    getAppVersionGithub();
  }

  useEffect(() => {
    if(appVersionGithub !== null && appVersionGithub !== currentAppVersion) {
      console.log("Update Available");
    } else {
      console.log("github version", appVersionGithub);
      console.log("current version", currentAppVersion);
    }
  }, [appVersionGithub])

  return (
    <View style={styles(activeTheme).container}>

      <TouchableOpacity
        style={styles(activeTheme).updateCheckerButton}
        onPress={() => handleUpdateModal()}
      >
        <Text style={styles(activeTheme).updateCheckerButtonText}>Check for updates</Text>
      </TouchableOpacity>

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
          <Text style={styles(activeTheme).themeSelectorTitle}>{selectedLocale.settingsPage.themeSelectorTitle}:</Text>
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

        <UpdateModal
          isUpdateModalVisible={isUpdateModalVisible}
          setUpdateModalVisible={setUpdateModalVisible}
          currentVersion={currentAppVersion}
          appVersionGithub={appVersionGithub}
        />
    </View>
  );
}

export default SettingsPage;
