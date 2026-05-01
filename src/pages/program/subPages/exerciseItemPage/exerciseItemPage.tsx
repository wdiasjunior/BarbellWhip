import React, { useMemo, useLayoutEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../../../sharedComponents/header/header";
import Loading from "../../../../sharedComponents/loading/loading";

import styles from "./exerciseItemPageStyles";

import { useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  settingsPageWeightRoundAtom,
} from "../../../../helpers/jotai/atoms";
import { useInitialRender } from "../../../../helpers/useInitialRender";
import { round } from "../../../calculator/math";

interface IProps {
  exerciseName: string;
  onermOBJ: OneRMs[];
  rmId: string;
  exerciseOBJ: DayExercises;
  weightUnit: string;
}

const ExerciseItemPage = (_props: any) => {

  const props: IProps = _props.route.params;

  const navigation = useNavigation();

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const weightRound = useAtomValue(settingsPageWeightRoundAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const onScreenLoad = () => {
    navigation.setOptions({
      headerTitle: () =>
        <Header
          title={props.exerciseName}
          backButton={true}
        />
    });
  }

  useLayoutEffect(() => {
    if (isInitialRender) {
      onScreenLoad();
    }
  }, [])

  const setsList = props.exerciseOBJ.set;
  const rmId = props.rmId;
  const weightUnit = props.weightUnit;
  const oneRMweight: OneRMs | any = props.onermOBJ.find((el) => el.id === rmId) ?? 0;

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <ScrollView style={s.wrapper} overScrollMode="never">
          <View style={s.setList}>
            {setsList.map((item, index) => {
              return (
                <View key={item.exerciseName + index} style={setsList.length !== index + 1 ? s.setListItem : s.setListLastItem}>

                  {item.exerciseName ? <Text style={s.title}>{item.exerciseName}</Text> : null}

                  {item.sets || item.reps ? (
                    <View style={s.setListItemRow}>
                      {item.sets ? <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.sets}:  <Text style={s.data}>{item.sets}</Text></Text> : null}
                      {item.reps ? <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.reps}:  <Text style={s.data}>{item.reps}</Text></Text> : null}
                    </View>
                  ) : null}

                  {(rmId !== "0" && item.weight !== "" && item.percentage) ? (
                    <View style={s.setListItemRow}>
                      {item.percentage ?
                        <Text style={s.label}>
                          {selectedLocale.programPage.exerciseInfo.weightLabel}:  <Text style={s.weightText}>{round(parseFloat(oneRMweight?.weight), parseFloat(item.percentage), weightRound, weightUnit)}{weightUnit}</Text>
                        </Text>
                        :
                        null
                      }
                      {item.percentage ? <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.percentage}:  <Text style={s.data}>{item.percentage}%</Text></Text> : null}
                    </View>
                  ) : null}

                  {rmId === "0" && item.weight && item.weight !== "" ? (
                    <View style={s.setListItemRow}>
                      <Text style={s.label}>
                        {selectedLocale.programPage.exerciseInfo.weightLabel}:  <Text style={s.weightText}>{item.weight}{weightUnit}</Text>
                      </Text>
                    </View>
                  ) : null}

                  {item.rpe || item.tempo ? (
                    <View style={s.setListItemRow}>
                      {item.rpe ? <Text style={s.label}>RPE:  <Text style={s.data}>{item.rpe}</Text></Text> : null}
                      {item.tempo ? <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.tempo}:  <Text style={s.data}>{item.tempo}</Text></Text> : null}
                    </View>
                  ) : null}

                  {item.rest ? (
                    <View style={s.setListItemRow}>
                      {item.rest ? <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.rest}:  <Text style={s.data}>{item.rest}</Text></Text> : null}
                    </View>
                  ) : null}

                  {item.altExercise1 ? (
                    <View style={s.setListItemRow}>
                      <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.altExercise1}:  <Text style={s.description}>{item.altExercise1}</Text></Text>
                    </View>
                  ) : null}

                  {item.altExercise2 ? (
                    <View style={s.setListItemRow}>
                      <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.altExercise2}:  <Text style={s.description}>{item.altExercise2}</Text></Text>
                    </View>
                  ) : null}

                  {item.description ? (
                    <View style={s.setListItemRow}>
                      <Text style={s.label}>{selectedLocale.programPage.exerciseInfo.description}:  <Text style={s.description}>{item.description}</Text></Text>
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
  );
}

export default ExerciseItemPage;
