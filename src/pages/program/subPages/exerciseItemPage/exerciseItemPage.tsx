import React, { useLayoutEffect, } from 'react';
import { Text, View, ScrollView, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from "../../../../sharedComponents/header/header";

import styles from './exerciseItemPageStyles';

import { useAtom } from 'jotai';
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

// interface Props {
//   exerciseName: any;
//   onermOBJ: any;
//   rmId: any;
//   exerciseOBJ: any;
//   weightUnit: any;
// }

const ExerciseItemPage = (props) => {

  const navigation = useNavigation();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={props.route.params.exerciseName}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  const setsList = props.route.params.exerciseOBJ.set;
  const onermOBJ = props.route.params.onermOBJ;
  const rmId = props.route.params.rmId;
  const weightUnit = props.route.params.weightUnit;
  const weightRoundingFactor = weightUnit === "kg" ? 2.5 : 5;
  const oneRMweight = onermOBJ.find((el) => el.id === rmId) ?? 0; // check this

  return (
    <ScrollView style={styles(activeTheme).container} overScrollMode="never">
      <View style={styles(activeTheme).setList}>
        {setsList.map((item, index) => {
          return (
            <View key={item.exerciseName + index} style={styles(activeTheme).setListItem}>

              {item.exerciseName ? <Text style={styles(activeTheme).title}>{item.exerciseName}</Text> : null}

              {item.sets || item.reps ? (
                <View style={styles(activeTheme).setListItemRow}>
                  {item.sets ? <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.sets}:  <Text style={styles(activeTheme).data}>{item.sets}</Text></Text> : null}
                  {item.reps ? <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.reps}:  <Text style={styles(activeTheme).data}>{item.reps}</Text></Text> : null}
                </View>
              ) : null}

              {item.percentage ? (
                <View style={styles(activeTheme).setListItemRow}>
                  {item.percentage ?
                    <Text style={styles(activeTheme).label}>
                      {selectedLocale.programPage.exerciseInfo.weightLabel}:  <Text style={styles(activeTheme).weightText}>{Math.ceil((parseFloat(oneRMweight?.weight) * (parseFloat(item.percentage) / 100) / weightRoundingFactor)) * weightRoundingFactor}{weightUnit}</Text>
                    </Text>
                    :
                    null
                  }
                  {item.percentage ? <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.percentage}:  <Text style={styles(activeTheme).data}>{item.percentage}%</Text></Text> : null}
                </View>
              ) : null }

              {item.rpe || item.tempo ? (
                <View style={styles(activeTheme).setListItemRow}>
                  {item.rpe ? <Text style={styles(activeTheme).label}>RPE:  <Text style={styles(activeTheme).data}>{item.rpe}</Text></Text> : null}
                  {item.tempo ? <Text style={styles(activeTheme).label}>Tempo:  <Text style={styles(activeTheme).data}>{item.tempo}</Text></Text> : null}
                </View>
              ) : null}

              {item.rest ? (
                <View style={styles(activeTheme).setListItemRow}>
                  {item.rest ? <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.rest}:  <Text style={styles(activeTheme).data}>{item.rest}</Text></Text> : null}
                </View>
              ) : null}

              {item.altExercise1 ? (
                <View style={styles(activeTheme).setListItemRow}>
                  <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.altExercise1}:  <Text style={styles(activeTheme).description}>{item.altExercise1}</Text></Text>
                </View>
              ) : null}

              {item.altExercise2 ? (
                <View style={styles(activeTheme).setListItemRow}>
                  <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.altExercise2}:  <Text style={styles(activeTheme).description}>{item.altExercise2}</Text></Text>
                </View>
              ) : null}

              {item.description ? (
                <View style={styles(activeTheme).setListItemRow}>
                  <Text style={styles(activeTheme).label}>{selectedLocale.programPage.exerciseInfo.description}:  <Text style={styles(activeTheme).description}>{item.description}</Text></Text>
                </View>
              ) : null}

            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default ExerciseItemPage;
