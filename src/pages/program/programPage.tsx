import React, { useState, useLayoutEffect } from "react";
import { Text, View, FlatList, Animated } from "react-native";
import SideMenu from "react-native-side-menu-updated";

import Header from "../../sharedComponents/header/header";
import TopTabBar from "../../sharedComponents/topTabBar/topTabBar";
import ExerciseItem from "./components/exerciseItem/exerciseItem";
import MenuWeekList from "./components/menuWeekList/menuWeekList";

import { useAtom, useAtomValue } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  activeProgramAtom,
  programPageSelectedDayAtom,
  programPageSelectedWeekAtom
} from "../../helpers/jotai/atomsWithStorage";

import styles from "./programPageStyles";

const ProgramPage = ({ navigation }) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);

  const activeProgram = useAtomValue<TrainingProgramFile>(activeProgramAtom);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  }

  const [selectedDay, setSelectedDay] = useAtom<number>(programPageSelectedDayAtom);
  const [selectedWeek, setSelectedWeek] = useAtom<number>(programPageSelectedWeekAtom);

  const headerTitle = (week: number): string => {
    const title = activeProgram?.trainingProgram?.length > 1
                    ? activeProgram?.programName + " - " + selectedLocale.programPage.week + " " + week
                    : activeProgram?.programName
    return activeProgram?.trainingProgram?.length > 0 ? title : selectedLocale.programPage.defaultTitle
  }

  const setHeader = (_selectedWeek: number = selectedWeek) => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={headerTitle(_selectedWeek + 1)}
                    setIsMenuOpen={setIsMenuOpen}
                    menu={activeProgram?.programName ? true : false}
                  />
              });
  }

  const selectDay = (day: number) => {
    setSelectedDay(day);
  }

  const selectWeek = (index: number) => {
    if(selectedWeek != index) {
      setSelectedDay(0);
    }
    setSelectedWeek(index);
    setIsMenuOpen(!isMenuOpen);
    setHeader(index)
  }

  useLayoutEffect(() => {
    setHeader();
  }, [activeProgram])

  const menuWeekList = (
    <MenuWeekList
      setIsMenuOpen={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      activeProgram={activeProgram}
      selectedWeek={selectedWeek}
      selectWeek={selectWeek}
    />
  )

  const flatListRenderItem = ({ item }) => (
    <ExerciseItem
      onermOBJ={activeProgram?.oneRMs}
      rmId={item.RMid}
      weightUnit={activeProgram?.weightUnit}
      exerciseName={item.exerciseName}
      exerciseOBJ={item}
    />
  )

  return (
    <View style={styles(activeTheme).container}>
      {activeProgram?.trainingProgram?.length > 0 ? (
        <SideMenu
          menu={menuWeekList}
          isOpen={isMenuOpen}
          onChange={closeMenu}
          menuPosition={"right"}
          bounceBackOnOverdraw={false}
          animationFunction={(prop, value) =>
            Animated.spring(prop, {
              toValue: value,
              overshootClamping: true,
              useNativeDriver: true,
              bounciness: 0,
            })
          }
        >
          <View style={styles(activeTheme).container}>
            <TopTabBar
              selectedWeek={selectedWeek}
              selectDay={selectDay}
              days={activeProgram?.trainingProgram[selectedWeek]?.week?.length}
              isProgramPage={true}
            />
            <FlatList
              data={activeProgram?.trainingProgram[selectedWeek]?.week[selectedDay]?.day}
              renderItem={flatListRenderItem}
              keyExtractor={(item, index) => item.exerciseName + "" + index}
            />
          </View>
        </SideMenu>
      ) : (
        <View style={styles(activeTheme).noActiveProgramTextContainer}>
          <Text style={styles(activeTheme).noActiveProgramTextTitle}>
            {selectedLocale.programPage.noActiveProgramTextTitle}
          </Text>
          <Text style={styles(activeTheme).noActiveProgramTextSubtitle}>
            {selectedLocale.programPage.noActiveProgramTextSubtitle}
          </Text>
        </View>
      )}
    </View>
  );
}

export default ProgramPage;
