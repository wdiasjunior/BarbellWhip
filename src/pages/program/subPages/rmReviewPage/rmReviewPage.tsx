import React from "react";
import { Text, View, ScrollView } from "react-native";

import styles from "./rmReviewPageStyles";

import Loading from "../../../../sharedComponents/loading/loading";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import { useInitialRender } from "../../../../helpers/useInitialRender";

interface IProps {
  onermOBJ: OneRMs[];
  weightUnit: string;
}

const RMReviewPage = (_props: any) => {

  const props: IProps = _props.route.params;

  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const onermOBJ = props.onermOBJ;
  const weightUnit = props.weightUnit;

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
  );
}

export default React.memo(RMReviewPage);
