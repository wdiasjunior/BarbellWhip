import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";

import styles from "./menuWeekListStyles";

interface IProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
  activeProgram: TrainingProgramFile;
  selectedWeek: number;
  selectWeek: (weekIndex: number) => void;
}

const MenuWeekList = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <View style={styles(activeTheme).containerDrawer}>
      <TouchableOpacity
        style={styles(activeTheme).rmReviewContainer}
        onPress={() => {
          props.setIsMenuOpen(!props.isMenuOpen);
          navigation.push("RMReviewPage", {
              onermOBJ: props.activeProgram?.oneRMs,
              weightUnit: props.activeProgram?.weightUnit
            });
        }}
      >
        <Text style={styles(activeTheme).rmReview}>{selectedLocale.programPage.rmReviewTitle}</Text>
      </TouchableOpacity>

      <View style={styles(activeTheme).weekSelectorContainer}>
        <Text style={styles(activeTheme).titleWeekDrawer}>{selectedLocale.programPage.weekSelectorTitle}</Text>
        <ScrollView persistentScrollbar={true} overScrollMode="never">
          {props.activeProgram?.trainingProgram?.map((item, index) => {
            return (
              <TouchableOpacity
                key={"MenuWeekListItem" + index}
                style={(index == props.selectedWeek) ? styles(activeTheme).drawerItemSelected : styles(activeTheme).drawerItem}
                onPress={() => props.selectWeek(index)}
              >
                <Text style={(index == props.selectedWeek) ? styles(activeTheme).drawerTextSelected : styles(activeTheme).drawerText}>
                  {selectedLocale.programPage.week} {index + 1}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default React.memo(MenuWeekList);
