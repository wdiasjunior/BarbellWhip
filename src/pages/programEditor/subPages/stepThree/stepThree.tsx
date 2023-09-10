import React, { useState, useLayoutEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useAtom, useAtomValue } from "jotai";
import { programEditorDataAtom, selectedWeekAtom, selectedDayAtom, programEditorModeAtom } from "../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";
import { useInitialRender } from "../../../../helpers/useInitialRender";

import { deepClone } from "../../../../helpers/deepClone";

import TopTabBar from "../../../../sharedComponents/topTabBar/topTabBar";
import Header from "../../../../sharedComponents/header/header";
import Loading from "../../../../sharedComponents/loading/loading";

import styles from "./stepThreeStyles";

const StepThree = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const selectedWeek = useAtomValue(selectedWeekAtom);
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);
  const programEditorMode = useAtomValue(programEditorModeAtom);
  const [modalOpen, setModalOpen] = useState(false);

  const onScreenLoad = () => {
    const title = programEditorMode === "Create"
                    ? selectedLocale.programEditorPage.programEditorStep3.title
                    : selectedLocale.programEditorPage.programEditorStep3.title2;
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

  const dayRef = useRef(null);
  const selectDay = (day: number) => {
    setSelectedDay(day);
  }

  const addExercise = (data) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day.push({
      RMid: data === "simple" ? "0" : data.id,
      exerciseName: data === "simple" ? "" : data.name,
      set: [
        {
          exerciseName: "",
          sets: "",
          reps: "",
          percentage: "",
          rpe: "",
          tempo: "",
          rest: "",
          altExercise1: "",
          altExercise2: "",
          description: "",
        }
      ]
    });
    setProgramEditorData(auxAtom);

    if(data === "simple") {
      setModalOpen(false);
      navigation.push("ExerciseEditorPage", {
        exerciseIndex: "add",
      });
    } else {
      setModalOpen(false);
      navigation.push("ExerciseEditorPage", {
        oneRMname: data.name,
        exerciseIndex: "add",
      });
    }
  }

  const editExercise = (index) => {
    navigation.push("ExerciseEditorPage", {
      exerciseIndex: index,
    });
  }

  const reorder = (data?:any, from?:any, to?:any) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day = data;
    setProgramEditorData(auxAtom);
  }

  const renderDayExerciseItems = ({ item, index, drag }) => {

    const deleteExercise = () => {
      let auxAtom = deepClone(programEditorData);
      auxAtom.trainingProgram[selectedWeek].week[selectedDay].day.splice(index, 1);
      setProgramEditorData(auxAtom);
    }

    return (
      <ScaleDecorator key={"ProgramEditorPage_StepThree_ExerciseItem" + index}>
        <View style={styles(activeTheme).exerciseItem}>
          <TouchableOpacity style={{width: 36, height: 30}} onLongPress={drag} delayLongPress={50}>
            <Ionicons name="reorder-three-outline" size={30} style={styles(activeTheme).exerciseItemIcon} />
          </TouchableOpacity>

          <Text style={styles(activeTheme).exerciseItemText}>
            {programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[index].exerciseName}
          </Text>

          <TouchableOpacity style={{width: 32, height: 20}} onPress={() => editExercise(index)} >
            <MaterialIcons name="edit" size={20} style={styles(activeTheme).exerciseItemIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={{width: 20, height: 20}} onPress={() => deleteExercise()} >
            <Ionicons name="trash-outline" size={20} style={styles(activeTheme).exerciseItemIcon} />
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    )
  }

  return (
    <View style={styles(activeTheme).container}>
      <TopTabBar
        selectedWeek={selectedWeek}
        selectDay={selectDay}
        days={programEditorData.trainingProgram[selectedWeek].week.length}
        isProgramPage={false}
      />
      {!isInitialRender ? (
        <View style={styles(activeTheme).exerciseList}>
          <GestureHandlerRootView>
            <DraggableFlatList
              ref={dayRef}
              data={programEditorData.trainingProgram[selectedWeek].week[selectedDay].day}
              keyExtractor={(item, index) => item.exerciseName + "" + index}
              onDragEnd={({data}) => reorder(data)}
              renderItem={renderDayExerciseItems}
              ListFooterComponent={() => {
                return (
                  <>
                    {programEditorData.trainingProgram[selectedWeek].week[selectedDay].day.length === 0 &&
                      <Text style={styles(activeTheme).RestDayText}>{selectedLocale.programEditorPage.programEditorStep3.emptyDayInfo}</Text>
                    }
                    <TouchableOpacity onPress={() => setModalOpen(true)} style={styles(activeTheme).AddExerciseButton}>
                      <Text style={styles(activeTheme).AddExerciseButtonText}>{selectedLocale.programEditorPage.programEditorStep3.addExerciseButton}</Text>
                    </TouchableOpacity>
                  </>
                )
              }}
            />
          </GestureHandlerRootView>
        </View>
      ) : (
        <Loading />
      )}

      <Modal
        isVisible={modalOpen}
        onBackButtonPress={() => setModalOpen(false)}
        onBackdropPress={() => setModalOpen(false)}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={100}
        animationOutTiming={1}
        backdropTransitionInTiming={100}
        backdropTransitionOutTiming={1}
      >
        <View style={styles(activeTheme).modalContent}>
          {programEditorData.oneRMs.length > 0 && programEditorData.oneRMs.map((item: OneRMs, index) => {
            return (
              <TouchableOpacity
                style={styles(activeTheme).modalItem}
                key={"ProgramEditorPage_StepThree_ModalItem" + index}
                onPress={() => addExercise(item)}
              >
                <Text style={styles(activeTheme).modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity style={styles(activeTheme).modalItem} onPress={() => addExercise("simple")}>
            <Text style={styles(activeTheme).modalItemText}>{selectedLocale.programEditorPage.programEditorStep3.simpleExerciseModalLabel}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}

export default StepThree;
