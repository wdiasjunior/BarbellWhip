import React, { useLayoutEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../../../sharedComponents/header/header";
import Loading from "../../../../sharedComponents/loading/loading";

import styles from "./exerciseItemPageStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";
import { useInitialRender } from "../../../../helpers/useInitialRender";

interface Props {
  exerciseName: string;
  onermOBJ: OneRMs[];
  rmId: string;
  exerciseOBJ: DayExercises;
  weightUnit: string;
}

const ExerciseItemPage = (_props: any) => {

  const props: Props = _props.route.params;

  const navigation = useNavigation();

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={props.exerciseName}
                    backButton={true}
                  />
              });
  }

  useLayoutEffect(() => {
    if(isInitialRender) {
      onScreenLoad();
    }
  }, [])

  const setsList = props.exerciseOBJ.set;
  const rmId = props.rmId;
  const weightUnit = props.weightUnit;
  const weightRoundingFactor = weightUnit === "kg" ? 2.5 : 5;
  const oneRMweight: OneRMs | any = props.onermOBJ.find((el) => el.id === rmId) ?? 0;

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView style={styles(activeTheme).wrapper} overScrollMode="never">
          <View style={styles(activeTheme).setList}>
            {setsList.map((item, index) => {
              return (
                <View key={item.exerciseName + index} style={setsList.length !== index + 1 ? styles(activeTheme).setListItem : styles(activeTheme).setListLastItem}>

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
      ) : (
        <Loading />
      )}
    </View>
  )
}

export default ExerciseItemPage;
