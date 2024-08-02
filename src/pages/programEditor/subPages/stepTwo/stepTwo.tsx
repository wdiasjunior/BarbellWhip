import React, { useLayoutEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  programEditorDataAtom,
  selectedWeekAtom,
  programEditorModeAtom,
} from "../../../../helpers/jotai/atoms";
import { useInitialRender } from "../../../../helpers/useInitialRender";

import { deepClone } from "../../../../helpers/deepClone";

import Header from "../../../../sharedComponents/header/header";
import Loading from "../../../../sharedComponents/loading/loading";

import styles from "./stepTwoStyles";

const StepTwo = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const programEditorMode = useAtomValue(programEditorModeAtom);
  const weekRef = useRef(null);

  const onScreenLoad = () => {
    const title = programEditorMode === "Create"
                    ? selectedLocale.programEditorPage.programEditorStep2.title
                    : selectedLocale.programEditorPage.programEditorStep2.title2;
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

  const addWeek = () => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram.push({ week: new Array(7).fill({ day:[] }) });
    setProgramEditorData(auxAtom);
  }

  const selectWeek = (index: number) => {
    setSelectedWeek(index);
  }

  const duplicateWeek = (index: number) => {
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

  const renderWeekItem = ({ item, index, drag }) => {

    const deleteWeek = () => {
      if(programEditorData.trainingProgram.length > 1) {
        let auxAtom = deepClone(programEditorData);
        auxAtom.trainingProgram.splice(index, 1);
        setProgramEditorData(auxAtom);
        if(selectedWeek + 1 === programEditorData.trainingProgram.length) {
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
            <Ionicons name="reorder-three-outline" size={30} style={(selectedWeek == index) ? styles(activeTheme).weekSelectedItemIcon : styles(activeTheme).weekItemIcon} />
          </TouchableOpacity>
          <Text style={(selectedWeek == index) ? styles(activeTheme).weekSelectedItemText : styles(activeTheme).weekItemText}>{selectedLocale.programEditorPage.programEditorStep2.week} {index + 1}</Text>

          <TouchableOpacity style={styles(activeTheme).weekItemIconContainer} >
            <Ionicons onPress={() => duplicateWeek(index)} name="copy-outline" size={20} style={(selectedWeek == index) ? styles(activeTheme).weekSelectedItemIcon : styles(activeTheme).weekItemIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles(activeTheme).weekItemIconContainer}  onPress={() => deleteWeek()} >
            <Ionicons name="trash-outline" size={20} style={(selectedWeek == index) ? styles(activeTheme).weekSelectedItemIcon : styles(activeTheme).weekItemIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <View style={styles(activeTheme).weekList}>
          <GestureHandlerRootView>
            <DraggableFlatList
              ref={weekRef}
              data={programEditorData.trainingProgram}
              keyExtractor={(_, index) => "ProgramEditorPage_WeekList_Item" + index}
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
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default StepTwo;
