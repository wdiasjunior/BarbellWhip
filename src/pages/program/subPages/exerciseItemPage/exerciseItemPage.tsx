import { React } from 'react';
import { Text, View, ScrollView, } from 'react-native';

import styles from './exerciseItemPageStyles';

import { useAtom } from 'jotai';
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

const ExerciseItemPage = (props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const setsList = props.route.params.exerciseOBJ.set;
  const onermOBJ = props.route.params.onermOBJ;
  const rmId = props.route.params.rmId;
  const weightUnit = props.route.params.weightUnit;
  const oneRMweight = onermOBJ.find((el) => el.id === rmId);

  return (
    <ScrollView style={styles(activeTheme).container} overScrollMode="never">
      <View style={styles(activeTheme).setList}>
        {setsList.map((item, index) => {
          return (
            <View key={item.exerciceName + index} style={styles(activeTheme).setListItem}>

              {item.exerciceName ? <Text style={styles(activeTheme).title}>{item.exerciceName}</Text> : null}

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
                      {selectedLocale.programPage.exerciseInfo.weightLabel}:  <Text style={styles(activeTheme).weightText}>{Math.ceil((parseFloat(oneRMweight?.weight) * (parseFloat(item.percentage) / 100) / 2.5)) * 2.5}{weightUnit}</Text>
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
