import React, { useState, useLayoutEffect, useCallback, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  programEditorDataAtom,
  selectedWeekAtom,
  selectedDayAtom,
  programEditorModeAtom,
} from "../../../../helpers/jotai/atoms";
import { useInitialRender } from "../../../../helpers/useInitialRender";

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
    const title = programEditorMode === "Create" ? selectedLocale.programEditorPage.programEditorStep3.title : selectedLocale.programEditorPage.programEditorStep3.title2;
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

  const selectDay = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  const addExercise = useCallback((data) => {
    setProgramEditorData(prev => ({
      ...prev,
      trainingProgram: prev.trainingProgram.map((tp, wi) =>
        wi === selectedWeek ? {
          ...tp,
          week: tp.week.map((w, di) =>
            di === selectedDay ? {
              ...w,
              day: [...w.day, {
                RMid: data === "simple" ? "0" : data.id,
                exerciseName: data === "simple" ? "" : data.name,
                set: [{
                  exerciseName: "",
                  sets: "",
                  reps: "",
                  percentage: "",
                  weight: "",
                  rpe: "",
                  tempo: "",
                  rest: "",
                  altExercise1: "",
                  altExercise2: "",
                  description: "",
                }]
              }]
            } : w
          )
        } : tp
      ),
    }));

    if (data === "simple") {
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
  }, [selectedWeek, selectedDay]);

  const editExercise = (index) => {
    navigation.push("ExerciseEditorPage", {
      exerciseIndex: index,
    });
  }

  const reorder = useCallback((data?: any, from?: any, to?: any) => {
    setProgramEditorData(prev => ({
      ...prev,
      trainingProgram: prev.trainingProgram.map((tp, wi) =>
        wi === selectedWeek ? {
          ...tp,
          week: tp.week.map((w, di) =>
            di === selectedDay ? { ...w, day: data } : w
          )
        } : tp
      ),
    }));
  }, [selectedWeek, selectedDay]);

  const renderDayExerciseItems = ({ item, getIndex, drag }) => {
    const index = getIndex();

    const deleteExercise = () => {
      setProgramEditorData(prev => ({
        ...prev,
        trainingProgram: prev.trainingProgram.map((tp, wi) =>
          wi === selectedWeek ? {
            ...tp,
            week: tp.week.map((w, di) =>
              di === selectedDay ? {
                ...w,
                day: w.day.filter((_, i) => i !== index)
              } : w
            )
          } : tp
        ),
      }));
    }

    return (
      <ScaleDecorator key={"ProgramEditorPage_StepThree_ExerciseItem" + index}>
        <View style={s.exerciseItem}>
          <TouchableOpacity style={{width: 36, height: 30}} onLongPress={drag} delayLongPress={50}>
            <Ionicons
              size={30}
              name="reorder-three-outline"
              color={activeTheme.text}
              style={s.exerciseItemIcon}
            />
          </TouchableOpacity>

          <Text style={s.exerciseItemText} numberOfLines={1}>
            {programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[index].exerciseName}
          </Text>

          <TouchableOpacity style={{width: 32, height: 20}} onPress={() => editExercise(index)} >
            <MaterialIcons name="edit" size={20} color={activeTheme.text} style={s.exerciseItemIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={{width: 20, height: 20}} onPress={() => deleteExercise()} >
            <Ionicons
              size={20}
              name="trash-outline"
              color={activeTheme.text}
              style={s.exerciseItemIcon}
            />
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    )
  }

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      <TopTabBar
        selectedWeek={selectedWeek}
        selectDay={selectDay}
        days={programEditorData.trainingProgram[selectedWeek].week.length}
        isProgramPage={false}
      />
      {!isInitialRender ? (
        <View style={s.exerciseList}>
          <GestureHandlerRootView>
            <DraggableFlatList
              data={programEditorData.trainingProgram[selectedWeek].week[selectedDay].day}
              keyExtractor={(item, index) => item.exerciseName + "" + index}
              onDragEnd={({data}) => reorder(data)}
              renderItem={renderDayExerciseItems}
              ListFooterComponent={() => {
                return (
                  <>
                    {programEditorData.trainingProgram[selectedWeek].week[selectedDay].day.length === 0 &&
                      <Text style={s.RestDayText}>{selectedLocale.programEditorPage.programEditorStep3.emptyDayInfo}</Text>
                    }
                    <TouchableOpacity onPress={() => setModalOpen(true)} style={s.AddExerciseButton}>
                      <Text style={s.AddExerciseButtonText}>{selectedLocale.programEditorPage.programEditorStep3.addExerciseButton}</Text>
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
        <View style={s.modalContent}>
          {programEditorData.oneRMs.length > 0 && programEditorData.oneRMs.map((item: OneRMs, index) => {
            return (
              <TouchableOpacity
                style={s.modalItem}
                key={"ProgramEditorPage_StepThree_ModalItem" + index}
                onPress={() => addExercise(item)}
              >
                <Text style={s.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity style={s.modalItem} onPress={() => addExercise("simple")}>
            <Text style={s.modalItemText}>{selectedLocale.programEditorPage.programEditorStep3.simpleExerciseModalLabel}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}

export default StepThree;
