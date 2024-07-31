import React from "react";
import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  programEditorDataAtom,
  selectedWeekAtom,
  selectedDayAtom,
} from "../../../../../helpers/jotai/atoms";
import { useInitialRender } from "../../../../../helpers/useInitialRender";

import Loading from "../../../../../sharedComponents/loading/loading";

import { deepClone } from "../../../../../helpers/deepClone";

import styles from "./exerciseEditorPageStyles";

interface IProps {
  oneRMname: string;
  exerciseIndex?: "add" | number;
}

const ExerciseEditorPage = (_props: any) => {

  const props: IProps = _props.route.params;

  const isInitialRender = useInitialRender();

  // TODO
  // add "discard" icon to header ?
  // on discard show modal asking to confirm

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const selectedWeek = useAtomValue(selectedWeekAtom);
  const selectedDay = useAtomValue(selectedDayAtom);

  const exerciseIndex = props.exerciseIndex;
  const length = programEditorData.trainingProgram[selectedWeek].week[selectedDay].day.length - 1;
  const exerciseData = exerciseIndex === "add" ? deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[length]) : deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex]);
  const oneRMweight: OneRMs | any = programEditorData.oneRMs.find((el: OneRMs) => el.id === exerciseData.RMid);
  const oneRMname = props.oneRMname;

  const weightRoundingFactor = programEditorData.weightUnit === "kg" ? 2.5 : 5;

  const addExerciseSubSet = () => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex === "add" ? length : exerciseIndex].set.push({
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
      description: ""
    });
    setProgramEditorData(auxAtom);
  }

  const editExerciseField = (field: string, input: string, index?: number) => {
    let auxAtom = deepClone(programEditorData);
    const auxExerciseIndex = exerciseIndex === "add" ? length : exerciseIndex;
    if(field === "parentExerciseName") {
      auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[auxExerciseIndex].exerciseName = input;
    } else {
      auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[auxExerciseIndex].set[index][field] = input;
    }
    setProgramEditorData(auxAtom);
  }

  const removeExerciseSubSet = (index: number) => {
    let auxAtom = deepClone(programEditorData);
    auxAtom.trainingProgram[selectedWeek].week[selectedDay].day[exerciseIndex === "add" ? length : exerciseIndex].set.splice(index, 1);
    setProgramEditorData(auxAtom);
  }

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView style={styles(activeTheme).wrapper} overScrollMode="never">

          <View style={styles(activeTheme).exerciseItem}>
            <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.exerciseNameInfo}</Text>
            <TextInput
              style={styles(activeTheme).input}
              placeholderTextColor={activeTheme.placeholderText}
              cursorColor={activeTheme.active}
              onChangeText={(input) => editExerciseField("parentExerciseName", input)}
              returnKeyType="done"
              editable={oneRMname ? false : true}
              value={exerciseData.exerciseName ? exerciseData.exerciseName+"" : ""}
            />
            {oneRMweight?.weight ? <Text style={styles(activeTheme).weightText}>1RM: {oneRMweight?.weight}{programEditorData.weightUnit}</Text> : null}
          </View>

          <View style={styles(activeTheme).setList}>

            {exerciseData.set.map((item: ExerciseSet, index: number) => {
              return (
                <View style={styles(activeTheme).exerciseItem} key={"ExerciseEditorPage_SetListExercise" + index}>

                <View style={styles(activeTheme).col}>
                  <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.exerciseVariation}</Text>
                  <View style={styles(activeTheme).row}>
                    <TextInput
                      style={styles(activeTheme).inputExerciseVariationName}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("exerciseName", input, index)}
                      value={item.exerciseName ? item.exerciseName+"" : ""}
                      returnKeyType="done"
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
                        value={item.sets ? item.sets+"" : ""}
                        returnKeyType="done"
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
                        value={item.reps ? item.reps+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  {exerciseData.RMid !== "0" ? (
                    <View style={styles(activeTheme).row}>
                      <View style={styles(activeTheme).col}>
                        <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.percentage}</Text>
                        <TextInput
                          keyboardType="numeric"
                          style={styles(activeTheme).input}
                          placeholderTextColor={activeTheme.placeholderText}
                          cursorColor={activeTheme.active}
                          onChangeText={(input) => editExerciseField("percentage", input, index)}
                          value={item.percentage ? item.percentage+"" : ""}
                          returnKeyType="done"
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
                  ) : null}

                  {exerciseData.RMid === "0" ? (
                    <View style={styles(activeTheme).col}>
                      <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.weightLabel}</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={styles(activeTheme).input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("weight", input, index)}
                        value={item.weight ? item.weight+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  ) : null}

                  <View style={styles(activeTheme).row}>
                    <View style={styles(activeTheme).col}>
                      <Text style={styles(activeTheme).inputLabel}>RPE</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={styles(activeTheme).input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("rpe", input, index)}
                        value={item.rpe ? item.rpe+"" : ""}
                        returnKeyType="done"
                      />
                    </View>

                    <View style={styles(activeTheme).col}>
                      <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.tempo}</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={styles(activeTheme).input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("tempo", input, index)}
                        value={item.tempo ? item.tempo+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  <View style={styles(activeTheme).row}>
                    <View style={styles(activeTheme).col}>
                      <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.rest}</Text>
                      <TextInput
                        keyboardType="default"
                        style={styles(activeTheme).input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("rest", input, index)}
                        value={item.rest ? item.rest+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  <View style={styles(activeTheme).col}>
                    <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.altExercise1}</Text>
                    <TextInput
                      keyboardType="default"
                      style={styles(activeTheme).input}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("altExercise1", input, index)}
                      value={item.altExercise1 ? item.altExercise1+"" : ""}
                      returnKeyType="done"
                    />
                  </View>

                  <View style={styles(activeTheme).ccol}>
                    <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.altExercise2}</Text>
                    <TextInput
                      keyboardType="default"
                      style={styles(activeTheme).input}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("altExercise2", input, index)}
                      value={item.altExercise2 ? item.altExercise2+"" : ""}
                      returnKeyType="done"
                    />
                  </View>

                  <View style={styles(activeTheme).col}>
                    <Text style={styles(activeTheme).inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.description}</Text>
                    <TextInput
                      keyboardType="default"
                      style={[styles(activeTheme).input, { height: "auto", flex: 0 }]}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("description", input, index)}
                      value={item.description ? item.description+"" : ""}
                      returnKeyType="done"
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
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default ExerciseEditorPage;
