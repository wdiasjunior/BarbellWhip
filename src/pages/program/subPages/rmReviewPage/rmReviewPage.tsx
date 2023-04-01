import React from "react";
import { Text, View, ScrollView, TouchableOpacity, } from "react-native";

import styles from "./rmReviewPageStyles";

import { useAtom } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

interface Props {
  onermOBJ: any;
  weightUnit: any;
}

const RMReviewPage = (props: Props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const onermOBJ = props.route.params.onermOBJ;
  const weightUnit = props.route.params.weightUnit;

  return (
    <ScrollView style={styles(activeTheme).container} overScrollMode="never">
      {onermOBJ?.map((item, index) => {
        return (
          <View key={"RMItem" + index} style={styles(activeTheme).item}>
            {item.name ? <Text style={styles(activeTheme).title}>{item.name}</Text> : null}
            {item.weight ?
              <Text style={styles(activeTheme).subTitle}>
                {selectedLocale.programPage.rmReviewWeightLabel}: <Text style={styles(activeTheme).weight}>{item.weight}{weightUnit}</Text>
              </Text>
              :
              null
            }
          </View>
        )
      })}
    </ScrollView>
  )
}

export default RMReviewPage;
