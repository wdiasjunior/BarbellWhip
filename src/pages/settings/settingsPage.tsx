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

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  return (
    <View style={styles(activeTheme).container}>

      <TouchableOpacity
        style={styles(activeTheme).updateCheckerButton}
        onPress={() => setUpdateModalVisible(true)}
      >
        <Text style={styles(activeTheme).appVersionText}>
          {selectedLocale.settingsPage.versionLabel}: {currentAppVersion}
        </Text>
        <Text style={styles(activeTheme).updateCheckerButtonText}>
          {selectedLocale.settingsPage.updateCheckerTitle}
        </Text>
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

        {isUpdateModalVisible &&
          <UpdateModal
            isUpdateModalVisible={isUpdateModalVisible}
            setUpdateModalVisible={setUpdateModalVisible}
            currentVersion={currentAppVersion}
          />
        }
    </View>
  );
}

export default SettingsPage;
