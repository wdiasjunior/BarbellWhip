import React, { useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import Header from "../../sharedComponents/header/header";
import Loading from "../../sharedComponents/loading/loading";

import { useInitialRender } from "../../helpers/useInitialRender";

import styles from "./prTrackerPageStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";

const PRTrackerPage = ({ navigation }) => {
  const isInitialRender = useInitialRender();

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  // const onScreenLoad = () => {
  //   navigation.setOptions({
  //     headerTitle: () =>
  //       <Header
  //         title={selectedLocale.openBarbellPage.title}
  //       />
  //   });
  // }
  //
  // useLayoutEffect(() => {
  //   if (isInitialRender) {
  //     onScreenLoad();
  //   }
  // }, [])

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  return (
    <View style={s.container}>
      {!isInitialRender ? (
        <View style={s.rowContainer}>
          <Text style={s.title}>{selectedLocale.openBarbellPage.title}</Text>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

export default PRTrackerPage;
