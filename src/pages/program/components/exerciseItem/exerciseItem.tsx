import React from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Ionicons.loadFont().then();

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../../../../helpers/jotai/atomsWithStorage";

import styles from './exerciseItemStyles';

// does this component even need to be in a separate file?

interface Props {
  onermOBJ: any;
  rmId: any;
  weightUnit: any;
  navigation: any;
  exerciseName: any;
  data: any;
}

const ExerciseItem = (props: Props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

  const navigation = useNavigation();
  // const isDone = false; // make this work for each item on the list?

  return (
      <TouchableOpacity
        style={styles(activeTheme).item}
        onPress={() => {
          navigation.push('ExerciseItemPage', {
            exerciseName: props.exerciseName,
            onermOBJ: props.onermOBJ,
            rmId: props.rmId,
            exerciseOBJ: props.data,
            weightUnit: props.weightUnit
          });
        }}
      >
        <Text adjustsFontSizeToFit style={styles(activeTheme).text1}>{props.exerciseName}</Text>
        {/*{isDone && <Ionicons name="checkmark" size={30} color="#3da9db" />}*/}
      </TouchableOpacity>
  )
}

export default ExerciseItem;
