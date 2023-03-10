import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Text, View, Switch, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

Ionicons.loadFont().then();

import { useAtom } from 'jotai';
import { programEditorDataAtom, selectedWeekAtom, selectedDayAtom } from "../../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../../../../helpers/deepClone";

import styles from './exerciseEditorPageStyles';

// interface Props {
//   oneRMweight: any; // never used? check this
//   oneRMname: any;
//   exerciseType: any;
//   exerciseIndex: any;
// }

const ExerciseEditorPage = (props) => {

  // TODO - add "discard" icon to header ?
  const navigation = useNavigation();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={selectedLocale.programEditorPage.exerciseEditorPage.title}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  const exerciseIndex = props.route.params.exerciseIndex;
  const length = programEditorData.trainingProgram[selectedWeek].week[selectedDay].day.length - 1;
  const exerciseData = exerciseIndex === "add" ? deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[length]) : deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex]);
  const exerciseType = props.route.params.exerciseType;
  const oneRMweight = programEditorData.oneRMs.find((el) => el.id === exerciseData.RMid);
  const oneRMname = props.route.params.oneRMname;

  const weightRoundingFactor = programEditorData.weightUnit === "kg" ? 2.5 : 5;

  const addExerciseSubSet = () => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex === "add" ? length : exerciseIndex].set.push({
      exerciseName: "",
      sets: "",
      reps: "",
      percentage: "",
      rpe: "",
      tempo: "",
      rest: "",
      altExercise1: "",
      altExercise2: "",
      description: ""
    });
    setProgramEditorData(auxAtom);
  }

  const editExerciseField = (field, e, index) => {
    let auxAtom = deepClone(programEditorData);
    const auxExerciseIndex = exerciseIndex === "add" ? length : exerciseIndex;
    if(field === "parentExerciseName") {
      auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[auxExerciseIndex].exerciseName = e;
    } else {
      auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[auxExerciseIndex].set[index][field] = e;
    }
    setProgramEditorData(auxAtom);
  }

  const removeExerciseSubSet = (index) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex === "add" ? length : exerciseIndex].set.splice(index, 1);
    setProgramEditorData(auxAtom);
  }

  return (
    <ScrollView style={styles(activeTheme).container} overScrollMode="never">

      <View style={styles(activeTheme).exerciseItem}>
        <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.exerciseNameInfo}</Text>
        <TextInput
          style={styles(activeTheme).input}
          placeholderTextColor={activeTheme.placeholderText}
          cursorColor={activeTheme.active}
          onChangeText={(input) => editExerciseField("parentExerciseName", input)}
          returnKeyType={"done"}
          editable={oneRMname ? false : true}
          value={exerciseData.exerciseName+""}
        />
        {oneRMweight?.weight ? <Text style={styles(activeTheme).weightText}>1RM: {oneRMweight?.weight}{programEditorData.weightUnit}</Text> : null}
      </View>

      <View style={styles(activeTheme).setList}>

        {exerciseData.set.map((item, index) => {
          return (
            <View style={styles(activeTheme).exerciseItem} key={index}>

            <View style={styles(activeTheme).col}>
              <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.exerciseVariation}</Text>
              <View style={styles(activeTheme).row}>
                <TextInput
                  style={styles(activeTheme).inputExerciseVariationName}
                  placeholderTextColor={activeTheme.placeholderText}
                  cursorColor={activeTheme.active}
                  onChangeText={(input) => editExerciseField("exerciseName", input, index)}
                  value={item.exerciseName+""}
                  returnKeyType={"done"}
                />
                <TouchableOpacity style={styles(activeTheme).exerciseItemRemoveIconContainer}  onPress={() => removeExerciseSubSet(index)}>
                  <Ionicons name="trash-outline" size={25} style={styles(activeTheme).exerciseItemRemoveIcon} />
                </TouchableOpacity>
              </View>
            </View>

              <View style={styles(activeTheme).row}>
                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.sets}</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("sets", input, index)}
                    value={item.sets+""}
                    returnKeyType={"done"}
                  />
                </View>

                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.reps}</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("reps", input, index)}
                    value={item.reps+""}
                    returnKeyType={"done"}
                  />
                </View>
              </View>

              <View style={styles(activeTheme).row}>
                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.percentage}</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("percentage", input, index)}
                    value={item.percentage+""}
                    returnKeyType={"done"}
                  />
                </View>
                <View style={styles(activeTheme).colWeight}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.weightLabel}</Text>
                  <Text style={styles(activeTheme).weightText}>
                    {isNaN(oneRMweight?.weight * item.percentage / 100) ? "" :
                      Math.ceil((oneRMweight?.weight * (item.percentage / 100) / weightRoundingFactor)) * weightRoundingFactor } {!isNaN(oneRMweight?.weight * item.percentage / 100) ? programEditorData.weightUnit : "0 " + programEditorData.weightUnit}
                  </Text>
                </View>
              </View>

              <View style={styles(activeTheme).row}>
                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>RPE</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("rpe", input, index)}
                    value={item.rpe+""}
                    returnKeyType={"done"}
                  />
                </View>

                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>Tempo</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("tempo", input, index)}
                    value={item.tempo+""}
                    returnKeyType={"done"}
                  />
                </View>
              </View>

              <View style={styles(activeTheme).row}>
                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.rest}</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("rest", input, index)}
                    value={item.rest+""}
                    returnKeyType={"done"}
                  />
                </View>
              </View>

              <View style={styles(activeTheme).row}>
                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.altExercise1}</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("altExercise1", input, index)}
                    value={item.altExercise1+""}
                    returnKeyType={"done"}
                  />
                </View>

                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.altExercise2}</Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles(activeTheme).input}
                    placeholderTextColor={activeTheme.placeholderText}
                    cursorColor={activeTheme.active}
                    onChangeText={(input) => editExerciseField("altExercise2", input, index)}
                    value={item.altExercise2+""}
                    returnKeyType={"done"}
                  />
                </View>
              </View>

              <View style={styles(activeTheme).col}>
                <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.description}</Text>
                <TextInput
                  style={[styles(activeTheme).input, { height: 'auto', flex: 0 }]}
                  placeholderTextColor={activeTheme.placeholderText}
                  cursorColor={activeTheme.active}
                  onChangeText={(input) => editExerciseField("description", input, index)}
                  value={item.description+""}
                  returnKeyType={"done"}
                  multiline
                />
              </View>
            </View>
          )
        })}

        <TouchableOpacity onPress={addExerciseSubSet} style={styles(activeTheme).AddExerciseButton}>
          <Text style={styles(activeTheme).AddExerciseButtonText}>{selectedLocale.programEditorPage.exerciseEditorPage.addExerciseButton}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default ExerciseEditorPage;
