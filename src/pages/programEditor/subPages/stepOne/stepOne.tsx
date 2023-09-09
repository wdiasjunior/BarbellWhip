import React, { useState, useEffect, useLayoutEffect } from "react";
import { Text, View, Switch, TouchableOpacity, ScrollView, TextInput, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAtom, useAtomValue, } from "jotai";
import { programEditorDataAtom, programEditorModeAtom } from "../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";
import { useInitialRender } from "../../../../helpers/useInitialRender";

import { deepClone } from "../../../../helpers/deepClone";
import { randomUUID } from "../../../../helpers/randomUUID";

import Header from "../../../../sharedComponents/header/header";
import Loading from "../../../../sharedComponents/loading/loading";

import styles from "./stepOneStyles";

/*
  TODO
  custom header for this stack to control go back button?
  save icon in header?
  info icon in header open modal quick tutorial for each page?

  add 1rm -> change into add rm -> add field for reps -> add math for estimated rm if reps > 1
  if text inputs are left empty, the option in modal on stepThree is also empty. add placeholder and on user interaction delete it?

  keyboard avoiding view not working properly
*/

const StepOne = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const programEditorMode = useAtomValue(programEditorModeAtom);
  const [weightUnit, setWeightUnit] = useState(programEditorData.weightUnit === "kg" ? false : true); // false == kg == left, true == lbs == right
  const toggleWeightUnitSwitch = () => setWeightUnit(previousState => !previousState);

  const onScreenLoad = () => {
    const title = programEditorMode === "Create"
                    ? selectedLocale.programEditorPage.programEditorStep1.title
                    : selectedLocale.programEditorPage.programEditorStep1.title2;
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={title}
                    menu={false}
                    saveButton={true}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    if(isInitialRender) {
      onScreenLoad();
    }
  }, [])

  useEffect(() => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.weightUnit = weightUnit ? "lbs" : "kg";
    setProgramEditorData(auxAtom);
  }, [weightUnit])

  const editProgramName = (input: string) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.programName = input;
    setProgramEditorData(auxAtom);
  }

  const editRMname = (input: string, index: number) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.oneRMs[index].name = input;
    setProgramEditorData(auxAtom);
  }

  const editRMweight = (input: string, index: number) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.oneRMs[index].weight = input;
    setProgramEditorData(auxAtom);
  }

  const add1rm = () => {
    let auxAtom = deepClone(programEditorData);
    let uuid = randomUUID();
    auxAtom.oneRMs.push({
      id: uuid,
      name: "",
      weight: ""
    });
    setProgramEditorData(auxAtom);
  }

  const remove1rm = (index: number) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.oneRMs.splice(index, 1);
    setProgramEditorData(auxAtom);
  }

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView overScrollMode="never">
          <TextInput
            placeholder={selectedLocale.programEditorPage.programEditorStep1.programName}
            placeholderTextColor={activeTheme.placeholderText}
            cursorColor={activeTheme.active}
            style={[styles(activeTheme).programNameTextInput, styles(activeTheme).shadowProp]}
            value={programEditorData.programName}
            onChangeText={(input) => editProgramName(input)}
          />

          <View style={[styles(activeTheme).weightUnitContainer, styles(activeTheme).shadowProp]} >
            <Text style={styles(activeTheme).weightUnitText}>kg</Text>
            <Switch
              trackColor={{ false: activeTheme.active, true: activeTheme.active }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWeightUnitSwitch}
              value={weightUnit}
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
            <Text style={styles(activeTheme).weightUnitText}>lbs</Text>
          </View>

          {programEditorData.oneRMs.map((item: OneRMs, index) => {
            return (
              <View style={[styles(activeTheme).onermItem, styles(activeTheme).shadowProp]} key={"ProgramEditorPage_StepOne_RMItem" + index} >
                <TextInput
                  placeholder={selectedLocale.programEditorPage.programEditorStep1.RMexercise}
                  placeholderTextColor={activeTheme.placeholderText}
                  cursorColor={activeTheme.active}
                  style={styles(activeTheme).oneRMTextInput}
                  value={item.name}
                  returnKeyType="done"
                  onChangeText={(input) => editRMname(input, index)}
                />
                <View style={styles(activeTheme).onermItem_InputRow} >
                  <TextInput
                    placeholder={selectedLocale.programEditorPage.programEditorStep1.weightLabel}
                    keyboardType="numeric"
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    style={styles(activeTheme).oneRMNumberInput}
                    value={item.weight+""}
                    onChangeText={(input) => editRMweight(input, index)}
                    returnKeyType="done"
                  />
                  <TouchableOpacity style={styles(activeTheme).onermItemIconContainer} onPress={() => remove1rm(index)}>
                    <Ionicons name="trash-outline" size={30} style={styles(activeTheme).onermItemIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}

          <TouchableOpacity onPress={add1rm} style={[styles(activeTheme).AddOneRMButton, styles(activeTheme).shadowProp]}>
            <Text style={styles(activeTheme).AddOneRMButtonText}>{selectedLocale.programEditorPage.programEditorStep1.add1RMexerciseButton}</Text>
          </TouchableOpacity>

        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}
export default StepOne;
