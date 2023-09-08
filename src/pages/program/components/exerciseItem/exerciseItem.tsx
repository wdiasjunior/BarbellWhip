import React from "react";
import { Text, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAtom } from "jotai";
import { activeThemeAtom } from "../../../../helpers/jotai/atomsWithStorage";

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
    </TouchableOpacity>
  )
}

export default React.memo(ExerciseItem); // TODO - remove this?
