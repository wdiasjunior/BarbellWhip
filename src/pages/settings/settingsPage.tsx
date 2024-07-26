import React, { useState } from "react";
import { Text, View, Switch, TouchableOpacity } from "react-native";
import UpdateModal from "../../sharedComponents/updateModal/updateModal";
import ListSelector from "./components/listSelector/listSelector";
import CalculationFormulasModal from "./components/calculationFormulasModal/calculationFormulasModal";

import styles from "./settingsPageStyles";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeIdAtom,
  activeThemeAtom,
  selectedLocaleIdAtom,
  selectedLocaleAtom,
  settingsPageWeightRoundAtom,
  settingsPage1RMFormulasAtom,
} from "../../helpers/jotai/atomsWithStorage";

import { themes } from "../../themes/";
import { locales } from "../../db/locales/";

import { version as currentAppVersion } from "../../../package.json";

const SettingsPage = () => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const [activeThemeId, setActiveThemeId] = useAtom<string>(activeThemeIdAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [selectedLocaleId, setSelectedLocaleId] = useAtom<string>(selectedLocaleIdAtom);
  const [weightRound, setWeightRound] = useAtom<boolean>(settingsPageWeightRoundAtom);
  const [RMFormulas, setRMFormulas] = useAtom(settingsPage1RMFormulasAtom);

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isCalculationFormulasModalVisible, setCalculationFormulasModalVisible] = useState(false);

  return (
    <View style={styles(activeTheme).container}>

      <View style={styles(activeTheme).itemContainer}>
        <View>
          <Text style={styles(activeTheme).title}>{selectedLocale.settingsPage.weightRoundingTitle}</Text>
          <Text style={styles(activeTheme).subtitle}>{selectedLocale.settingsPage.weightRoundingDescription}</Text>
        </View>
        <Switch
          trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setWeightRound}
          value={weightRound}
          style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
        />
      </View>

      <TouchableOpacity onPress={() => setCalculationFormulasModalVisible(true)}>
        <Text style={styles(activeTheme).title}>{selectedLocale.settingsPage.calculationFormulasTitle}</Text>
        <Text style={styles(activeTheme).subtitle}>{selectedLocale.settingsPage.calculationFormulasDescription}</Text>
      </TouchableOpacity>

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

      {isUpdateModalVisible &&
        <UpdateModal
          isUpdateModalVisible={isUpdateModalVisible}
          setUpdateModalVisible={setUpdateModalVisible}
          currentVersion={currentAppVersion}
        />
      }
      {isCalculationFormulasModalVisible &&
        <CalculationFormulasModal
          isCalculationFormulasModalVisible={isCalculationFormulasModalVisible}
          setCalculationFormulasModalVisible={setCalculationFormulasModalVisible}
          RMFormulas={RMFormulas}
          setRMFormulas={setRMFormulas}
        />
      }
    </View>
  );
}

export default SettingsPage;
