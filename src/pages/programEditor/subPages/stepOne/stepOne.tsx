import React, { useState, useEffect, useLayoutEffect } from "react"; // , useRef
import { Text, View, Switch, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAtom } from "jotai";
import { programEditorDataAtom } from "../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../../../helpers/deepClone";
import { randomUUID } from "../../../../helpers/randomUUID";

import Header from "../../../../sharedComponents/header/header";

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

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [weightUnit, setWeightUnit] = useState(programEditorData.weightUnit === "kg" ? false : true); // false == kg == left, true == lbs == right
  const toggleWeightUnitSwitch = () => setWeightUnit(previousState => !previousState);

  // const refInputRMName, refInputRMWeight = useRef();

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={selectedLocale.programEditorPage.programEditorStep1.title}
                    menu={false}
                    saveButton={true}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  useEffect(() => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.weightUnit = weightUnit ? "lbs" : "kg";
    setProgramEditorData(auxAtom);
  }, [weightUnit])

  const editProgramName = (e) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.programName = e;
    setProgramEditorData(auxAtom);
  }
  const editRMname = (e, index) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.oneRMs[index].name = e;
    setProgramEditorData(auxAtom);
  }
  const editRMweight = (e, index) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.oneRMs[index].weight = +e;
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

  const remove1rm = (index) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.oneRMs.splice(index, 1);
    setProgramEditorData(auxAtom);
  }

  return (
    <View style={styles(activeTheme).container}>
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

        {programEditorData.oneRMs.map((item, index) => {
          return (
            <View style={[styles(activeTheme).onermItem, styles(activeTheme).shadowProp]} key={index} >
              <TextInput
                placeholder={selectedLocale.programEditorPage.programEditorStep1.RMexercise}
                placeholderTextColor={activeTheme.placeholderText}
                cursorColor={activeTheme.active}
                style={styles(activeTheme).oneRMTextInput}
                value={item.name}
                returnKeyType={"done"}
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
                  returnKeyType={"done"}
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
    </View>
  );
}
export default StepOne;
