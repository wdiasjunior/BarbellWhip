import React from "react";
import { Text, View, ScrollView, TouchableOpacity, } from "react-native";

import styles from "./rmReviewPageStyles";

import Loading from "../../../../sharedComponents/loading/loading";

import { useAtom } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";
import { useInitialRender } from "../../../../helpers/useInitialRender";

interface Props {
  onermOBJ: any;
  weightUnit: any;
}

const RMReviewPage = (props: Props) => {

  const isInitialRender = useInitialRender();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const onermOBJ = props.route.params.onermOBJ;
  const weightUnit = props.route.params.weightUnit;

  return (
    <View style={styles(activeTheme).container}>
      {!isInitialRender ? (
        <ScrollView style={styles(activeTheme).wrapper} overScrollMode="never">
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
      ) : (
        <Loading />
      )}
    </View>
  )
}

export default React.memo(RMReviewPage);
