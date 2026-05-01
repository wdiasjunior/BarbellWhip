import React, { useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAtomValue } from "jotai";
import { activeThemeAtom } from "../../../../helpers/jotai/atoms";

import styles from "./exerciseItemStyles";

interface IProps {
  onermOBJ: OneRMs[];
  rmId: string;
  weightUnit: string;
  exerciseName: string;
  exerciseOBJ: DayExercises;
}

const ExerciseItem = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={s.item}
      onPress={() => {
        navigation.push("ExerciseItemPage", {
          exerciseName: props.exerciseName,
          onermOBJ: props.onermOBJ,
          rmId: props.rmId,
          exerciseOBJ: props.exerciseOBJ,
          weightUnit: props.weightUnit,
        });
      }}
    >
      <Text numberOfLines={1} style={s.text1}>
        {props.exerciseName}
      </Text>
    </TouchableOpacity>
  );
}

export default React.memo(ExerciseItem);
