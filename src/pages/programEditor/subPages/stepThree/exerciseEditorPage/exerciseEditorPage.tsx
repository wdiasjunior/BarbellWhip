import React, { useState, useEffect, useRef } from "react";
import { Text, View, Switch, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAtom } from 'jotai';
import { programEditorDataAtom, selectedWeekAtom, selectedDayAtom } from "../../../../../helpers/jotai/programEditorAtoms";
import { activeThemeAtom } from "../../../../../helpers/jotai/atomsWithStorage";

import { deepClone } from "../../../../../helpers/deepClone";

import styles from './exerciseEditorPageStyles';

const ExerciseEditorPage = (props) => {

  // TODO - add "discard" icon to header ?

  const [activeTheme, ] = useAtom(activeThemeAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const [selectedWeek, setSelectedWeek] = useAtom(selectedWeekAtom);
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);

  const exerciseIndex = props.route.params.exerciseIndex;
  const length = programEditorData.trainingProgram[selectedWeek].week[selectedDay].day.length - 1;
  const exerciseData = exerciseIndex === "add" ? deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[length]) : deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex]);
  const exerciseType = props.route.params.exerciseType;
  const oneRMweight = programEditorData.oneRMs.find((el) => el.id === exerciseData.RMid);
  const oneRMname = props.route.params.oneRMname;

  const addExerciseSubSet = () => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex === "add" ? length : exerciseIndex].set.push({
      exerciceName: "",
      sets: "",
      reps: "",
      percentage: "",
      rpe: "",
      tempo: "",
      description: ""
    });
    setProgramEditorData(auxAtom);
  }

  const editExerciseField = (field, e, index) => {
    let auxAtom = deepClone(programEditorData);
    const auxExerciseIndex = exerciseIndex === "add" ? length : exerciseIndex;
    if(field === "parentExerciseName") {
      auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[auxExerciseIndex].exerciceName = e;
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
        <Text style={styles(activeTheme).inputLabel}>Exercise name displayed on day list</Text>
        <TextInput
          style={styles(activeTheme).input}
          placeholderTextColor={activeTheme.placeholderText}
          cursorColor={activeTheme.active}
          onChangeText={(input) => editExerciseField("parentExerciseName", input)}
          returnKeyType={"done"}
          editable={oneRMname ? false : true}
          value={exerciseData.exerciceName+""}
        />
        {oneRMweight?.weight ? <Text style={styles(activeTheme).weightText}>1RM: {oneRMweight?.weight}{programEditorData.weightUnit}</Text> : null}
      </View>

      <View style={styles(activeTheme).setList}>

        {exerciseData.set.map((item, index) => {
          return (
            <View style={styles(activeTheme).exerciseItem} key={index}>

            <View style={styles(activeTheme).col}>
              <Text style={styles(activeTheme).inputLabel}>Exercise/Variation name</Text>
              <View style={styles(activeTheme).row}>
                <TextInput
                  style={styles(activeTheme).inputExerciseVariationName}
                  placeholderTextColor={activeTheme.placeholderText}
                  cursorColor={activeTheme.active}
                  onChangeText={(input) => editExerciseField("exerciceName", input, index)}
                  value={item.exerciceName+""}
                  returnKeyType={"done"}
                />
                <TouchableOpacity style={styles(activeTheme).exerciseItemRemoveIconContainer}  onPress={() => removeExerciseSubSet(index)}>
                  <Ionicons name="trash-outline" size={25} style={styles(activeTheme).exerciseItemRemoveIcon} />
                </TouchableOpacity>
              </View>
            </View>

              <View style={styles(activeTheme).row}>
                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>Sets</Text>
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
                  <Text style={styles(activeTheme).inputLabel}>Reps</Text>
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
                  <Text style={styles(activeTheme).inputLabel}>Percentage</Text>
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
                  <Text style={styles(activeTheme).inputLabel}>Weight</Text>
                  <Text style={styles(activeTheme).weightText}>
                    {isNaN(oneRMweight?.weight * item.percentage / 100) ? "" :
                      Math.ceil((oneRMweight?.weight * (item.percentage / 100) / 2.5)) * 2.5 } {!isNaN(oneRMweight?.weight * item.percentage / 100) ? programEditorData.weightUnit : "0 " + programEditorData.weightUnit}
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

              <View style={styles(activeTheme).col}>
                <Text style={styles(activeTheme).inputLabel}>Description</Text>
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
          <Text style={styles(activeTheme).AddExerciseButtonText}>ADD EXERCISE</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default ExerciseEditorPage;
