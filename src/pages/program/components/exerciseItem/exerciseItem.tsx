import React from "react";
import { Text, View, TouchableOpacity, } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useAtom } from "jotai";
import { activeThemeAtom } from "../../../../helpers/jotai/atomsWithStorage";

import type { OneRMs, DayExercises } from "../../../../db/programs/programTypings";

import styles from "./exerciseItemStyles";

interface Props {
  onermOBJ: OneRMs[];
  rmId: string;
  weightUnit: string;
  exerciseName: string;
  exerciseOBJ: DayExercises;
}

const ExerciseItem = (props: Props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

  const navigation = useNavigation();
  // const isDone = false; // TODO - make this work for each item on the list?

  return (
      <TouchableOpacity
        style={styles(activeTheme).item}
        onPress={() => {
          navigation.push("ExerciseItemPage", {
            exerciseName: props.exerciseName,
            onermOBJ: props.onermOBJ,
            rmId: props.rmId,
            exerciseOBJ: props.exerciseOBJ,
            weightUnit: props.weightUnit
          });
        }}
      >
        <Text adjustsFontSizeToFit style={styles(activeTheme).text1}>{props.exerciseName}</Text>
        {/*{isDone && <Ionicons name="checkmark" size={30} color="#3da9db" />}*/}
      </TouchableOpacity>
  )
}

export default React.memo(ExerciseItem);
