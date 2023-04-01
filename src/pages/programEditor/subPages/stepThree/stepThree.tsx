import React, { useState, useEffect, useLayoutEffect, useRef, } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, } from "react-native";
import Modal from "react-native-modal";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useAtom } from "jotai";
import { programEditorDataAtom, selectedWeekAtom, selectedDayAtom } from "../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../../../helpers/deepClone";

import TopTabBar from "../../../../sharedComponents/topTabBar/topTabBar";
import Header from "../../../../sharedComponents/header/header";

import styles from "./stepThreeStyles";

const StepThree = ({ navigation }) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);
  const [modalOpen, setModalOpen] = useState(false);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={selectedLocale.programEditorPage.programEditorStep3.title}
                    menu={false}
                    saveButton={true}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  const dayRef = useRef(null);
  const selectDay = (day) => {
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
        oneRMweight: 0, // TODO - never used? check this
        exerciseIndex: "add",
      });
    } else {
      setModalOpen(false);
      navigation.push("ExerciseEditorPage", {
        oneRMweight: data.weight, // TODO - never used? check this
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

  const reorder = (data, from, to) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day = data;
    setProgramEditorData(auxAtom);
  }

  // TODO check if callback should be used again, since it's used in stepTwo
  // const renderDayExerciseItems = useCallback(({item, index, drag}) => {
  const renderDayExerciseItems = ({item, index, drag}) => {

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

          <TouchableOpacity style={{width: 20, height: 20}} onPress={() => deleteExercise(index)} >
            <Ionicons name="trash-outline" size={20} style={styles(activeTheme).exerciseItemIcon} />
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    )
  }
  // }, [programEditorData.trainingProgram[selectedWeek].week[selectedDay].day, addExercise, reorder, selectedDay, selectedWeek]); // not sure if this array should have all of this

  return (
    <View style={styles(activeTheme).container}>
      <TopTabBar
        setFirstTab={selectedWeek}
        selectDay={selectDay}
        days={programEditorData.trainingProgram[selectedWeek].week.length}
        isProgramPage={false}
      />

      <View style={styles(activeTheme).exerciseList}>{/*<ScrollView overScrollMode="never">*/}

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
          {programEditorData.oneRMs.length > 0 && programEditorData.oneRMs.map((item, index) => {
            return (
              <TouchableOpacity style={styles(activeTheme).modalItem} key={"ProgramEditorPage_StepThree_ModalItem" + index} onPress={() => addExercise(item)}>
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
