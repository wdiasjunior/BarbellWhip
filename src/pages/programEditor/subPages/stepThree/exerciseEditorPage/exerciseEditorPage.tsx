import React, { useCallback, useMemo } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const insets = useSafeAreaInsets();
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const [programEditorData, setProgramEditorData] = useAtom(programEditorDataAtom);
  const selectedWeek = useAtomValue(selectedWeekAtom);
  const selectedDay = useAtomValue(selectedDayAtom);

  const exerciseIndex = props.exerciseIndex;
  const length = programEditorData.trainingProgram[selectedWeek].week[selectedDay].day.length - 1;

  const exerciseData = useMemo(() => {
    const idx = exerciseIndex === "add" ? length : exerciseIndex;
    return deepClone(programEditorData.trainingProgram[selectedWeek].week[selectedDay].day[idx]);
  }, [programEditorData, selectedWeek, selectedDay, exerciseIndex, length]);

  const oneRMweight = useMemo(() => {
    return programEditorData.oneRMs.find((el: OneRMs) => el.id === exerciseData?.RMid);
  }, [programEditorData.oneRMs, exerciseData?.RMid]);

  const oneRMname = props.oneRMname;

  const weightRoundingFactor = programEditorData.weightUnit === "kg" ? 2.5 : 5;

  const addExerciseSubSet = useCallback(() => {
    const auxExerciseIndex = exerciseIndex === "add" ? length : exerciseIndex;
    setProgramEditorData(prev => ({
      ...prev,
      trainingProgram: prev.trainingProgram.map((tp, wi) =>
        wi === selectedWeek ? {
          ...tp,
          week: tp.week.map((w, di) =>
            di === selectedDay ? {
              ...w,
              day: w.day.map((ex, ei) =>
                ei === auxExerciseIndex ? {
                  ...ex,
                  set: [...ex.set, {
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
                } : ex
              )
            } : w
          )
        } : tp
      ),
    }));
  }, [selectedWeek, selectedDay, exerciseIndex, length]);

  const editExerciseField = useCallback((field: string, input: string, index?: number) => {
    const auxExerciseIndex = exerciseIndex === "add" ? length : exerciseIndex;
    setProgramEditorData(prev => ({
      ...prev,
      trainingProgram: prev.trainingProgram.map((tp, wi) =>
        wi === selectedWeek ? {
          ...tp,
          week: tp.week.map((w, di) =>
            di === selectedDay ? {
              ...w,
              day: w.day.map((ex, ei) =>
                ei === auxExerciseIndex ? (
                  field === "parentExerciseName"
                    ? { ...ex, exerciseName: input }
                    : { ...ex, set: ex.set.map((s, si) => si === index ? { ...s, [field]: input } : s) }
                ) : ex
              )
            } : w
          )
        } : tp
      ),
    }));
  }, [selectedWeek, selectedDay, exerciseIndex, length]);

  const removeExerciseSubSet = useCallback((index: number) => {
    const auxExerciseIndex = exerciseIndex === "add" ? length : exerciseIndex;
    setProgramEditorData(prev => ({
      ...prev,
      trainingProgram: prev.trainingProgram.map((tp, wi) =>
        wi === selectedWeek ? {
          ...tp,
          week: tp.week.map((w, di) =>
            di === selectedDay ? {
              ...w,
              day: w.day.map((ex, ei) =>
                ei === auxExerciseIndex ? {
                  ...ex,
                  set: ex.set.filter((_, si) => si !== index)
                } : ex
              )
            } : w
          )
        } : tp
      ),
    }));
  }, [selectedWeek, selectedDay, exerciseIndex, length]);

  const s = useMemo(() => styles(activeTheme, insets.bottom), [activeTheme, insets.bottom]);

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <KeyboardAwareScrollView style={s.wrapper} overScrollMode="never" keyboardShouldPersistTaps="handled" bottomOffset={20}>

          <View style={s.exerciseItem}>
            <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.exerciseNameInfo}</Text>
            <TextInput
              style={s.input}
              placeholderTextColor={activeTheme.placeholderText}
              cursorColor={activeTheme.active}
              onChangeText={(input) => editExerciseField("parentExerciseName", input)}
              returnKeyType="done"
              editable={oneRMname ? false : true}
              value={exerciseData.exerciseName ? exerciseData.exerciseName+"" : ""}
            />
            {oneRMweight?.weight ? <Text style={s.weightText}>1RM: {oneRMweight?.weight}{programEditorData.weightUnit}</Text> : null}
          </View>

          <View style={s.setList}>

            {exerciseData.set.map((item: ExerciseSet, index: number) => {
              return (
                <View style={s.exerciseItem} key={"ExerciseEditorPage_SetListExercise" + index}>

                  <View style={s.col}>
                    <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.exerciseVariation}</Text>
                    <View style={s.row}>
                      <TextInput
                        style={s.inputExerciseVariationName}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("exerciseName", input, index)}
                        value={item.exerciseName ? item.exerciseName+"" : ""}
                        returnKeyType="done"
                      />
                      <TouchableOpacity style={s.exerciseItemRemoveIconContainer}  onPress={() => removeExerciseSubSet(index)}>
                        <Ionicons
                          size={25}
                          name="trash-outline"
                          color={activeTheme.text}
                          style={s.exerciseItemRemoveIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={s.row}>
                    <View style={s.col}>
                      <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.sets}</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={s.input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("sets", input, index)}
                        value={item.sets ? item.sets+"" : ""}
                        returnKeyType="done"
                      />
                    </View>

                    <View style={s.col}>
                      <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.reps}</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={s.input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("reps", input, index)}
                        value={item.reps ? item.reps+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  {exerciseData.RMid !== "0" ? (
                    <View style={s.row}>
                      <View style={s.col}>
                        <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.percentage}</Text>
                        <TextInput
                          keyboardType="numeric"
                          style={s.input}
                          placeholderTextColor={activeTheme.placeholderText}
                          cursorColor={activeTheme.active}
                          onChangeText={(input) => editExerciseField("percentage", input, index)}
                          value={item.percentage ? item.percentage+"" : ""}
                          returnKeyType="done"
                        />
                      </View>
                      <View style={s.colWeight}>
                        <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.weightLabel}</Text>
                        <Text style={s.weightText}>
                          {isNaN(oneRMweight?.weight * item.percentage / 100) ? "" :
                            Math.ceil((oneRMweight?.weight * (item.percentage / 100) / weightRoundingFactor)) * weightRoundingFactor } {!isNaN(oneRMweight?.weight * item.percentage / 100) ? programEditorData.weightUnit : "0 " + programEditorData.weightUnit}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {exerciseData.RMid === "0" ? (
                    <View style={s.col}>
                      <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.weightLabel}</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={s.input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("weight", input, index)}
                        value={item.weight ? item.weight+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  ) : null}

                  <View style={s.row}>
                    <View style={s.col}>
                      <Text style={s.inputLabel}>RPE</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={s.input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("rpe", input, index)}
                        value={item.rpe ? item.rpe+"" : ""}
                        returnKeyType="done"
                      />
                    </View>

                    <View style={s.col}>
                      <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.tempo}</Text>
                      <TextInput
                        keyboardType="numeric"
                        style={s.input}
                        placeholderTextColor={activeTheme.placeholderText}
                        cursorColor={activeTheme.active}
                        onChangeText={(input) => editExerciseField("tempo", input, index)}
                        value={item.tempo ? item.tempo+"" : ""}
                        returnKeyType="done"
                      />
                    </View>
                  </View>

                  <View style={s.col}>
                    <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.rest}</Text>
                    <TextInput
                      keyboardType="default"
                      style={s.input}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("rest", input, index)}
                      value={item.rest ? item.rest+"" : ""}
                      returnKeyType="done"
                    />
                  </View>

                  <View style={s.col}>
                    <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.altExercise1}</Text>
                    <TextInput
                      keyboardType="default"
                      style={s.input}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("altExercise1", input, index)}
                      value={item.altExercise1 ? item.altExercise1+"" : ""}
                      returnKeyType="done"
                    />
                  </View>

                  <View style={s.ccol}>
                    <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.altExercise2}</Text>
                    <TextInput
                      keyboardType="default"
                      style={s.input}
                      placeholderTextColor={activeTheme.placeholderText}
                      cursorColor={activeTheme.active}
                      onChangeText={(input) => editExerciseField("altExercise2", input, index)}
                      value={item.altExercise2 ? item.altExercise2+"" : ""}
                      returnKeyType="done"
                    />
                  </View>

                  <View style={s.col}>
                    <Text style={s.inputLabel}>{selectedLocale.programEditorPage.exerciseEditorPage.description}</Text>
                    <TextInput
                      keyboardType="default"
                      style={[s.input, { height: "auto", flex: 0 }]}
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

            <TouchableOpacity onPress={addExerciseSubSet} style={s.AddExerciseButton}>
              <Text style={s.AddExerciseButtonText}>{selectedLocale.programEditorPage.exerciseEditorPage.addExerciseButton}</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAwareScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default ExerciseEditorPage;
