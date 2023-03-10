import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont().then();

import { useAtom } from 'jotai';
import { programEditorDataAtom, selectedWeekAtom } from "../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../../../helpers/deepClone";

import Header from "../../../../sharedComponents/header/header";

import styles from './stepTwoStyles';

const StepTwo = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const weekRef = useRef(null);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={selectedLocale.programEditorPage.programEditorStep2.title}
                    menu={false}
                    saveButton={true}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  const addWeek = () => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram.push({ week: new Array(7).fill({ day:[] }) });
    setProgramEditorData(auxAtom);
  }

  const selectWeek = (index) => {
    setSelectedWeek(index);
  }

  const duplicateWeek = (index) => {
    let auxAtom = deepClone(programEditorData);
    let weekToDuplicate = programEditorData.trainingProgram[index];
    auxAtom.trainingProgram.splice(index + 1, 0, weekToDuplicate);
    setProgramEditorData(auxAtom);
    selectWeek(index + 1)
  }

  const reorder = (data, from, to) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram = data;
    setProgramEditorData(auxAtom);
    if(selectedWeek == from) {
      selectWeek(to);
    } else if(selectedWeek < from && selectedWeek >= to) {
      selectWeek(selectedWeek + 1);
    } else if(selectedWeek > from && selectedWeek <= to) {
      selectWeek(selectedWeek - 1);
    }
  }

  const renderWeekItem = useCallback(({item, index, drag}) => {

    const deleteWeek = () => {
      if(programEditorData.trainingProgram.length > 1) {
        let auxAtom = deepClone(programEditorData);
        auxAtom.trainingProgram.splice(index, 1);
        setProgramEditorData(auxAtom);
        if(selectedWeek === programEditorData.trainingProgram.length) {
          selectWeek(selectedWeek - 1);
        } else if(selectedWeek === index || selectedWeek > index) {
          selectWeek(index);
        }
      }
    }

    return (
      <ScaleDecorator>
        <TouchableOpacity
          style={selectedWeek == index ? styles(activeTheme).weekItemSelected : styles(activeTheme).weekItem}
          onPress={() => selectWeek(index)}
        >
          <TouchableOpacity style={{width: 40, height: 30}} onLongPress={drag} delayLongPress={50}>
            <Ionicons name="reorder-three-outline" size={30} style={styles(activeTheme).weekItemIcon} />
          </TouchableOpacity>
          <Text style={(selectedWeek == index) ? styles(activeTheme).weekSelectedItemText : styles(activeTheme).weekItemText}>{selectedLocale.programEditorPage.programEditorStep2.week} {index + 1}</Text>

          <TouchableOpacity style={styles(activeTheme).weekItemIconContainer} >
            <Ionicons onPress={() => duplicateWeek(index)} name="copy-outline" size={20} style={styles(activeTheme).weekItemIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles(activeTheme).weekItemIconContainer}  onPress={() => deleteWeek(index)} >
            <Ionicons name="trash-outline" size={20} style={styles(activeTheme).weekItemIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }, [programEditorData.trainingProgram, addWeek, reorder, selectWeek, duplicateWeek]); // not sure if this array should have all of this

  return (
    <View style={styles(activeTheme).container}>
      <View style={styles(activeTheme).weekList}>
        <GestureHandlerRootView>
          <DraggableFlatList
            ref={weekRef}
            data={programEditorData.trainingProgram}
            keyExtractor={(item, index) => index}
            onDragEnd={({data, from, to}) => reorder(data, from, to)}
            renderItem={renderWeekItem}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity onPress={addWeek} style={styles(activeTheme).AddWeekButton}>
                  <Text style={styles(activeTheme).AddWeekButtonText}>{selectedLocale.programEditorPage.programEditorStep2.addWeekButton}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
}

export default StepTwo;
