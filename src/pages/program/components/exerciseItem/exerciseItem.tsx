import React from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../../../../helpers/jotai/atomsWithStorage";

import styles from './exerciseItemStyles';

// does this component even need to be in a separate file?

const ExerciseItem = (props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

  const navigation = useNavigation();
  // const isDone = false; // make this work for each item on the list?

  return (
      <TouchableOpacity
        style={styles(activeTheme).item}
        onPress={() => { navigation.push('ExerciseItemPage', {onermOBJ: props.onermOBJ, rmId: props.rmId, exerciseOBJ: props.data, weightUnit: props.weightUnit}); }}
      >
        <Text style={styles(activeTheme).text1}>{props.exerciseName}</Text>
        {/*{isDone && <Ionicons name="checkmark" size={30} color="#3da9db" />}*/}
      </TouchableOpacity>
  )
}

export default ExerciseItem;
