import { React } from 'react';
import { Text, View, ScrollView, } from 'react-native';

import styles from './exerciseItemPageStyles';

import { useAtom } from 'jotai';
import { activeThemeAtom } from "../../../../helpers/jotai/atomsWithStorage";

const ExerciseItemPage = (props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);

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
                  {item.sets ? <Text style={styles(activeTheme).label}>Sets:  <Text style={styles(activeTheme).data}>{item.sets}</Text></Text> : null}
                  {item.reps ? <Text style={styles(activeTheme).label}>Reps:  <Text style={styles(activeTheme).data}>{item.reps}</Text></Text> : null}
                </View>
              ) : null}

              {item.percentage ? (
                <View style={styles(activeTheme).setListItemRow}>
                  {item.percentage ?
                    <Text style={styles(activeTheme).label}>
                      Weight:  <Text style={styles(activeTheme).data}>{Math.ceil((parseFloat(oneRMweight?.weight) * (parseFloat(item.percentage) / 100) / 2.5)) * 2.5}{weightUnit}</Text>
                    </Text>
                    :
                    null
                  }
                  {item.percentage ? <Text style={styles(activeTheme).label}>Percentage:  <Text style={styles(activeTheme).data}>{item.percentage}%</Text></Text> : null}
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
                  <Text style={styles(activeTheme).label}>Description:  <Text style={styles(activeTheme).description}>{item.description}</Text></Text>
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
