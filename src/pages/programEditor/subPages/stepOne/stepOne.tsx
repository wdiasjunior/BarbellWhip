import React, { useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { Text, View, Switch, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  programEditorDataAtom,
  programEditorModeAtom,
} from "../../../../helpers/jotai/atoms";
import { useInitialRender } from "../../../../helpers/useInitialRender";

import { randomUUID } from "../../../../helpers/randomUUID";

import Header from "../../../../sharedComponents/header/header";
import Loading from "../../../../sharedComponents/loading/loading";

import styles from "./stepOneStyles";

const StepOne = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const programEditorMode = useAtomValue(programEditorModeAtom);
  const [weightUnit, setWeightUnit] = useState(programEditorData.weightUnit === "kg" ? false : true); // false == kg == left, true == lbs == right
  const toggleWeightUnitSwitch = () => setWeightUnit(previousState => !previousState);

  const onScreenLoad = () => {
    const title = programEditorMode === "Create" ? selectedLocale.programEditorPage.programEditorStep1.title : selectedLocale.programEditorPage.programEditorStep1.title2;
    navigation.setOptions({
      headerTitle: () =>
        <Header
          title={title}
          menu={false}
          saveButton={true}
          backButton={true}
        />
    });
  }

  useLayoutEffect(() => {
    if (isInitialRender) {
      onScreenLoad();
    }
  }, [])

  useEffect(() => {
    setProgramEditorData(prev => ({
      ...prev,
      weightUnit: weightUnit ? "lbs" : "kg",
    }));
  }, [weightUnit])

  const editProgramName = useCallback((input: string) => {
    setProgramEditorData(prev => ({ ...prev, programName: input }));
  }, []);

  const editRMname = useCallback((input: string, index: number) => {
    setProgramEditorData(prev => ({
      ...prev,
      oneRMs: prev.oneRMs.map((rm, i) => i === index ? { ...rm, name: input } : rm),
    }));
  }, []);

  const editRMweight = useCallback((input: string, index: number) => {
    setProgramEditorData(prev => ({
      ...prev,
      oneRMs: prev.oneRMs.map((rm, i) => i === index ? { ...rm, weight: input } : rm),
    }));
  }, []);

  const add1rm = useCallback(() => {
    setProgramEditorData(prev => ({
      ...prev,
      oneRMs: [...prev.oneRMs, { id: randomUUID(), name: "", weight: "" }],
    }));
  }, []);

  const remove1rm = useCallback((index: number) => {
    setProgramEditorData(prev => ({
      ...prev,
      oneRMs: prev.oneRMs.filter((_, i) => i !== index),
    }));
  }, []);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <KeyboardAwareScrollView overScrollMode="never" keyboardShouldPersistTaps="handled" bottomOffset={20}>
          <TextInput
            placeholder={selectedLocale.programEditorPage.programEditorStep1.programName}
            placeholderTextColor={activeTheme.placeholderText}
            cursorColor={activeTheme.active}
            style={[s.programNameTextInput, s.shadowProp]}
            value={programEditorData.programName}
            onChangeText={(input) => editProgramName(input)}
          />

          <View style={[s.weightUnitContainer, s.shadowProp]} >
            <Text style={s.weightUnitText}>kg</Text>
            <Switch
              trackColor={{ false: activeTheme.active, true: activeTheme.active }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleWeightUnitSwitch}
              value={weightUnit}
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
            <Text style={s.weightUnitText}>lbs</Text>
          </View>

          {programEditorData.oneRMs.map((item: OneRMs, index) => {
            return (
              <View style={[s.onermItem, s.shadowProp]} key={"ProgramEditorPage_StepOne_RMItem" + index} >
                <TextInput
                  placeholder={selectedLocale.programEditorPage.programEditorStep1.RMexercise}
                  placeholderTextColor={activeTheme.placeholderText}
                  cursorColor={activeTheme.active}
                  style={s.oneRMTextInput}
                  value={item.name}
                  returnKeyType="done"
                  onChangeText={(input) => editRMname(input, index)}
                />
                <View style={s.onermItem_InputRow} >
                  <TextInput
                    placeholder={selectedLocale.programEditorPage.programEditorStep1.weightLabel}
                    keyboardType="numeric"
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    style={s.oneRMNumberInput}
                    value={item.weight+""}
                    onChangeText={(input) => editRMweight(input, index)}
                    returnKeyType="done"
                  />
                  <TouchableOpacity style={s.onermItemIconContainer} onPress={() => remove1rm(index)}>
                    <Ionicons
                      size={30}
                      name="trash-outline"
                      color={activeTheme.text}
                      style={s.onermItemIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}

          <TouchableOpacity onPress={add1rm} style={[s.AddOneRMButton, s.shadowProp]}>
            <Text style={s.AddOneRMButtonText}>{selectedLocale.programEditorPage.programEditorStep1.add1RMexerciseButton}</Text>
          </TouchableOpacity>

        </KeyboardAwareScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default StepOne;
