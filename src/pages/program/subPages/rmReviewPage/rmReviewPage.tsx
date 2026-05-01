import React, { useMemo } from "react";
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

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const onermOBJ = props.onermOBJ;
  const weightUnit = props.weightUnit;

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <ScrollView style={s.wrapper} overScrollMode="never">
        {onermOBJ?.map((item, index) => {
          return (
            <View key={"RMItem" + index} style={s.item}>
              {item.name ? <Text style={s.title}>{item.name}</Text> : null}
              {item.weight ? <Text style={s.weight}>{item.weight}{weightUnit}</Text> : null}
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
