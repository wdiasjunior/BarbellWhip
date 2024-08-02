import React from "react";
import { Text, View, Switch, ScrollView, TextInput } from "react-native";

import styles from "./weightRackPageStyles";

import { deepClone } from "../../../helpers/deepClone";
import { weightConversion } from "../../../helpers/weightConversion";

import Loading from "../../../sharedComponents/loading/loading";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  plateMathPageWeightAtom,
  plateMathWeightUnitAtom,
  plateMathBarWeightAtom,
  plateMathWeightRackAtom,
  plateMathShowBumperAtom,
  plateMathBumperPlatesRackAtom,
  plateMathShowColoredPlatesAtom,
} from "../../../helpers/jotai/atoms";

import { useInitialRender } from "../../../helpers/useInitialRender";

const WeightRackPage = () => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom<number>(plateMathPageWeightAtom);
  const [weightUnit, setWeightUnit] = useAtom<boolean>(plateMathWeightUnitAtom); // false == kg == left, true == lbs == right
  const [barWeight, setBarWeight] = useAtom<BarWeight>(plateMathBarWeightAtom);
  const [weightRack, setWeightRack] = useAtom<WeightRack>(plateMathWeightRackAtom);
  const [showBumper, setShowBumper] = useAtom<boolean>(plateMathShowBumperAtom);
  const [bumperPlatesRack, setBumperPlatesRack] = useAtom<BumperRack>(plateMathBumperPlatesRackAtom);
  const [showColoredPlates, setShowColoredPlates] = useAtom<boolean>(plateMathShowColoredPlatesAtom);

  const handleWeightUnitChange = (_weightUnit: boolean) => {
    const _convertedWeight = weightConversion(currentWeight, _weightUnit);
    setCurrentWeight(_convertedWeight);
    setWeightUnit(_weightUnit);
  }

  const editWeightRack = (_input: string, _field: string, _weightUnit: string) => {
    const auxWeightRack = deepClone(weightRack);
    auxWeightRack[_weightUnit][_field] = _input;
    setWeightRack(auxWeightRack);
  }

  const editBumperPlateRack = (_input: string, _field: string, _weightUnit: string) => {
    const auxBumperPlatesRack = deepClone(bumperPlatesRack);
    auxBumperPlatesRack[_weightUnit][_field] = _input;
    setBumperPlatesRack(auxBumperPlatesRack);
  }

  const editBarWeight = (_input: string, _weightUnit: string) => {
    const auxBarWeight = deepClone(barWeight);
    auxBarWeight[_weightUnit] = _input;
    setBarWeight(auxBarWeight);
  }

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView style={styles(activeTheme).wrapper}>
          <View style={styles(activeTheme).inputGroupSwitches}>
            <View style={styles(activeTheme).inputGroupSwitch}>
              <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.weightUnitLabel}</Text>
              <View style={styles(activeTheme).inputWeightRackRow}>
                <Text style={styles(activeTheme).switchLabel}>kg</Text>
                <Switch
                  trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleWeightUnitChange}
                  value={weightUnit}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
                />
                <Text style={styles(activeTheme).switchLabel}>lbs</Text>
              </View>
            </View>

            <View style={styles(activeTheme).inputGroupSwitch}>
              <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.bumperToggleLabel}</Text>
              <View style={styles(activeTheme).inputWeightRackRow}>
                <Text style={styles(activeTheme).switchLabel}>off</Text>
                <Switch
                  trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setShowBumper}
                  value={showBumper}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
                />
                <Text style={styles(activeTheme).switchLabel}>on</Text>
              </View>
            </View>

            <View style={styles(activeTheme).inputGroupSwitch}>
              <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.coloredPlatesToggleLabel}</Text>
              <View style={styles(activeTheme).inputWeightRackRow}>
                <Text style={styles(activeTheme).switchLabel}>off</Text>
                <Switch
                  trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={setShowColoredPlates}
                  value={showColoredPlates}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18 }}
                />
                <Text style={styles(activeTheme).switchLabel}>on</Text>
              </View>
            </View>
          </View>

          <View style={styles(activeTheme).inputGroup}>
            <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.barWeightTitle}</Text>
            <View style={styles(activeTheme).row}>
              <View style={styles(activeTheme).inputWeightRackRow}>
                <Text style={styles(activeTheme).inputLabel}>kg</Text>
                  <TextInput
                    cursorColor={activeTheme.active}
                    style={[styles(activeTheme).input, styles(activeTheme).shadowProp]}
                    value={barWeight.kg.toString()}
                    onChangeText={(input) => editBarWeight(input, "kg")}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
              </View>
              <View style={styles(activeTheme).inputWeightRackRow}>
                <Text style={styles(activeTheme).inputLabel}>lbs</Text>
                  <TextInput
                    cursorColor={activeTheme.active}
                    style={[styles(activeTheme).input, styles(activeTheme).shadowProp]}
                    value={barWeight.lbs.toString()}
                    onChangeText={(input) => editBarWeight(input, "lbs")}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
              </View>
            </View>
          </View>

          <View style={styles(activeTheme).inputGroup}>
            <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.plateRackTitle}</Text>
            <View style={styles(activeTheme).row}>
              <View style={styles(activeTheme).column}>
                <Text style={styles(activeTheme).inputLabel}>kg</Text>
                {Object.entries(weightRack.kg).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={styles(activeTheme).inputWeightRackRow} key={"PlateRackPage_WeightRackInput_1_" + j} >
                      <Text style={styles(activeTheme).inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[styles(activeTheme).input, styles(activeTheme).shadowProp]}
                        value={plate[1].toString()}
                        onChangeText={(input) => editWeightRack(input, plate[0], "kg")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
              <View style={styles(activeTheme).column}>
                <Text style={styles(activeTheme).inputLabel}>lbs</Text>
                {Object.entries(weightRack.lbs).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={styles(activeTheme).inputWeightRackRow} key={"PlateRackPage_WeightRackInput_2_" + j} >
                      <Text style={styles(activeTheme).inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[styles(activeTheme).input, styles(activeTheme).shadowProp]}
                        value={plate[1].toString()}
                        onChangeText={(input) => editWeightRack(input, plate[0], "lbs")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          <View style={styles(activeTheme).inputGroupLast}>
            <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.bumperPlatesRackTitle}</Text>
            <View style={styles(activeTheme).row}>
              <View style={styles(activeTheme).column}>
                <Text style={styles(activeTheme).inputLabel}>kg</Text>
                {Object.entries(bumperPlatesRack.kg).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={styles(activeTheme).inputWeightRackRow} key={"PlateRackPage_BumperPlatesRackInput_1_" + j} >
                      <Text style={styles(activeTheme).inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[styles(activeTheme).input, styles(activeTheme).shadowProp]}
                        value={plate[1].toString()}
                        onChangeText={(input) => editBumperPlateRack(input, plate[0], "kg")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
              <View style={styles(activeTheme).column}>
                <Text style={styles(activeTheme).inputLabel}>lbs</Text>
                {Object.entries(bumperPlatesRack.lbs).sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])).map((plate, j) => {
                  return (
                    <View style={styles(activeTheme).inputWeightRackRow} key={"PlateRackPage_BumperPlatesRackInput_2_" + j} >
                      <Text style={styles(activeTheme).inputLabel}>{plate[0]} </Text>
                      <TextInput
                        cursorColor={activeTheme.active}
                        style={[styles(activeTheme).input, styles(activeTheme).shadowProp]}
                        value={plate[1].toString()}
                        onChangeText={(input) => editBumperPlateRack(input, plate[0], "lbs")}
                        keyboardType="numeric"
                        returnKeyType="done"
                      />
                    </View>
                  )
                })}
              </View>
            </View>
          </View>

          {/* TODO */}
          {/*<Text style={styles(activeTheme).inputGroupTitle}>import/export plate math settings ?</Text>*/}

        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default WeightRackPage;
