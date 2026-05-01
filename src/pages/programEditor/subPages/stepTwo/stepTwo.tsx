import React, { useLayoutEffect, useCallback, useMemo } from "react";
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

  const onScreenLoad = () => {
    const title = programEditorMode === "Create" ? selectedLocale.programEditorPage.programEditorStep2.title : selectedLocale.programEditorPage.programEditorStep2.title2;
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

  const addWeek = useCallback(() => {
    setProgramEditorData(prev => ({
      ...prev,
      trainingProgram: [...prev.trainingProgram, { week: new Array(7).fill({ day:[] }) }],
    }));
  }, []);

  const selectWeek = useCallback((index: number) => {
    setSelectedWeek(index);
  }, []);

  const duplicateWeek = useCallback((index: number) => {
    setProgramEditorData(prev => {
      const weekCopy = deepClone(prev.trainingProgram[index]);
      const newProgram = [...prev.trainingProgram];
      newProgram.splice(index + 1, 0, weekCopy);
      return { ...prev, trainingProgram: newProgram };
    });
    selectWeek(index + 1);
  }, [selectWeek]);

  const reorder = useCallback((data, from, to) => {
    setProgramEditorData(prev => ({ ...prev, trainingProgram: data }));

    if (selectedWeek == from) {
      selectWeek(to);
    } else if (selectedWeek < from && selectedWeek >= to) {
      selectWeek(selectedWeek + 1);
    } else if (selectedWeek > from && selectedWeek <= to) {
      selectWeek(selectedWeek - 1);
    }
  }, [selectedWeek, selectWeek]);

  const renderWeekItem = ({ item, getIndex, drag }) => {
    const index = getIndex();

    const deleteWeek = () => {
      if (programEditorData.trainingProgram.length > 1) {
        setProgramEditorData(prev => ({
          ...prev,
          trainingProgram: prev.trainingProgram.filter((_, i) => i !== index),
        }));

        if (selectedWeek + 1 === programEditorData.trainingProgram.length) {
          selectWeek(selectedWeek - 1);
        } else if (selectedWeek === index || selectedWeek > index) {
          selectWeek(index);
        }
      }
    }

    return (
      <ScaleDecorator>
        <TouchableOpacity
          style={selectedWeek == index ? s.weekItemSelected : s.weekItem}
          onPress={() => selectWeek(index)}
        >
          <TouchableOpacity style={{width: 40, height: 30}} onLongPress={drag} delayLongPress={50}>
            <Ionicons
              size={30}
              name="reorder-three-outline"
              color={(selectedWeek == index) ? activeTheme.backgroundSecondary : activeTheme.text}
              style={(selectedWeek == index) ? s.weekSelectedItemIcon : s.weekItemIcon}
            />
          </TouchableOpacity>
          <Text style={(selectedWeek == index) ? s.weekSelectedItemText : s.weekItemText}>{selectedLocale.programEditorPage.programEditorStep2.week} {index + 1}</Text>

          <TouchableOpacity style={s.weekItemIconContainer} >
            <Ionicons
              size={20}
              name="copy-outline"
              onPress={() => duplicateWeek(index)}
              color={(selectedWeek == index) ? activeTheme.backgroundSecondary : activeTheme.text}
              style={(selectedWeek == index) ? s.weekSelectedItemIcon : s.weekItemIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={s.weekItemIconContainer}  onPress={() => deleteWeek()} >
            <Ionicons
              size={20}
              name="trash-outline"
              color={(selectedWeek == index) ? activeTheme.backgroundSecondary : activeTheme.text}
              style={(selectedWeek == index) ? s.weekSelectedItemIcon : s.weekItemIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <View style={s.weekList}>
          <GestureHandlerRootView>
            <DraggableFlatList
              data={programEditorData.trainingProgram}
              keyExtractor={(_, index) => "ProgramEditorPage_WeekList_Item" + index}
              onDragEnd={({data, from, to}) => reorder(data, from, to)}
              renderItem={renderWeekItem}
              ListFooterComponent={() => {
                return (
                  <TouchableOpacity onPress={addWeek} style={s.AddWeekButton}>
                    <Text style={s.AddWeekButtonText}>{selectedLocale.programEditorPage.programEditorStep2.addWeekButton}</Text>
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
