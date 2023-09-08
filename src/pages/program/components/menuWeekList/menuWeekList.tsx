import React from "react";
import { Text, View, ScrollView, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAtom } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atomsWithStorage";

import styles from "./menuWeekListStyles";

interface Props {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
  activeProgram: TrainingProgramFile;
  selectedWeek: number;
  selectWeek: (weekIndex: number) => void;
}

const MenuWeekList = (props: Props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const navigation = useNavigation();

  return (
    <View style={styles(activeTheme).containerDrawer}>
      <View style={styles(activeTheme).rmReviewContainer}>{/* // TODO - check this*/}
        <TouchableOpacity
          style={styles(activeTheme).item} // TODO - check this
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
      </View>

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
                  {selectedLocale.programPage.week} {JSON.stringify(index + 1)} {/* TODO - why is this even a thing? */}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default React.memo(MenuWeekList); // TODO - remove this?
