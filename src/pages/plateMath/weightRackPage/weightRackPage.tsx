import React from "react";
import { Text, View, Switch, ScrollView, TextInput, } from "react-native";

import styles from "./weightRackPageStyles";

import { deepClone } from "../../../helpers/deepClone";
import { weightConversion } from "../../../helpers/weightConversion";

import Loading from "../../../sharedComponents/loading/loading";

import { useAtom } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  plateMathPageWeight,
  plateMathWeightUnit,
  plateMathShowBumper,
  plateMathBarWeight,
  plateMathWeightRack,
  plateMathBumperPlatesRack,
} from "../../../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../../../helpers/useInitialRender";

const WeightRackPage = () => {

  const isInitialRender = useInitialRender();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);
  const [currentWeight, setCurrentWeight] = useAtom(plateMathPageWeight);
  const [weightUnit, setWeightUnit] = useAtom(plateMathWeightUnit); // false == kg == left, true == lbs == right
  const [showBumper, setShowBumper] = useAtom(plateMathShowBumper);
  const [barWeight, setBarWeight ] = useAtom(plateMathBarWeight);
  const [weightRack, setWeightRack ] = useAtom(plateMathWeightRack);
  const [bumperPlatesRack, setBumperPlatesRack ] = useAtom(plateMathBumperPlatesRack);

  const handleWeightUnitChange = (e) => {
    const _convertedWeight = weightConversion(currentWeight, e);
    setCurrentWeight(_convertedWeight);
    setWeightUnit(e);
  }

  const editWeightRack = (_input, _field, _weightUnit) => {
    const auxWeightRack = deepClone(weightRack);
    auxWeightRack[_weightUnit][_field] = _input;
    setWeightRack(auxWeightRack);
  }

  const editBumperPlateRack = (_input, _field, _weightUnit) => {
    const auxBumperPlatesRack = deepClone(bumperPlatesRack);
    auxBumperPlatesRack[_weightUnit][_field] = _input;
    setBumperPlatesRack(auxBumperPlatesRack);
  }

  const editBarWeight = (_input, _weightUnit) => {
    const auxBarWeight = deepClone(barWeight);
    auxBarWeight[_weightUnit] = _input;
    setBarWeight(auxBarWeight);
  }

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView style={styles(activeTheme).wrapper}>
          <View style={styles(activeTheme).inputGroup}>
            <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.weightUnitLabel}</Text>
            <View style={styles(activeTheme).inputWeightRackRow}>
              <Text style={styles(activeTheme).weightUnitLabel}>kg</Text>
              <Switch
                trackColor={{ false: activeTheme.inactive, true: activeTheme.active }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleWeightUnitChange}
                value={weightUnit}
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginHorizontal: 18, }}
              />
              <Text style={styles(activeTheme).weightUnitLabel}>lbs</Text>
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
                {Object.entries(weightRack.kg).map((plate, j) => {
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
                {Object.entries(weightRack.lbs).map((plate, j) => {
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

          <View style={styles(activeTheme).inputGroup}>
            <Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.bumperPlatesRackTitle}</Text>
            <View style={styles(activeTheme).row}>
              <View style={styles(activeTheme).column}>
                <Text style={styles(activeTheme).inputLabel}>kg</Text>
                {Object.entries(bumperPlatesRack.kg).map((plate, j) => {
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
                {Object.entries(bumperPlatesRack.lbs).map((plate, j) => {
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
          {/*<Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.colorCodedPlatesTitle}</Text>*/}
          {/*<Text style={styles(activeTheme).inputGroupTitle}>{selectedLocale.plateMathPage.weightRackPage.collarsSwitchTitle}</Text>*/}
          {/*<Text style={styles(activeTheme).inputGroupTitle}>import/export plate math settings ?</Text>*/}

        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default WeightRackPage;
