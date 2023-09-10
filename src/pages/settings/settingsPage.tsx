import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import UpdateModal from "../../sharedComponents/updateModal/updateModal";
import ListSelector from "./components/listSelector/listSelector";

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
  const [activeThemeId, setActiveThemeId] = useAtom<string>(activeThemeIdAtom);

  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [selectedLocaleId, setSelectedLocaleId] = useAtom<string>(selectedLocaleIdAtom);

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

      <Text style={styles(activeTheme).updateCheckerButtonText}>Version: {currentAppVersion}</Text>
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

        <ListSelector
          title={selectedLocale.settingsPage.languageSelectorTitle}
          data={locales}
          setSelected={setSelectedLocaleId}
          selected={selectedLocaleId}
          activeTheme={activeTheme}
        />

        <ListSelector
          title={selectedLocale.settingsPage.themeSelectorTitle}
          data={themes}
          setSelected={setActiveThemeId}
          selected={activeThemeId}
          activeTheme={activeTheme}
        />

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
