import React, { useState, useLayoutEffect, } from "react";
import { Text, View, FlatList, ScrollView, TouchableOpacity, Animated } from "react-native";
import SideMenu from "react-native-side-menu-updated";

import Header from "../../sharedComponents/header/header";
import TopTabBar from "../../sharedComponents/topTabBar/topTabBar";
// import Loading from "../../sharedComponents/loading/loading";
import ExerciseItem from "./components/exerciseItem/exerciseItem";

import { useAtom } from "jotai";
import {
  activeThemeAtom,
  selectedLocaleAtom,
  activeProgramAtom,
  programPageSelectedDayAtom,
  programPageSelectedWeekAtom
} from "../../helpers/jotai/atomsWithStorage";

// import { useInitialRender } from "../../helpers/useInitialRender";

import styles from "./programPageStyles";
import type { TrainingProgramFile } from "../../db/programs/programTypings";

const ProgramPage = ({ navigation }) => {

  // const isInitialRender = useInitialRender();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [activeProgram, ] = useAtom<TrainingProgramFile>(activeProgramAtom);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const closeMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  }

  const [selectedDay, setSelectedDay] = useAtom<number>(programPageSelectedDayAtom);
  const [selectedWeek, setSelectedWeek] = useAtom<number>(programPageSelectedWeekAtom);

  const selectDay = (day: number) => {
    setSelectedDay(day);
  }
  const selectWeek = ({ index }) => {
    if(selectedWeek != index) {
      setSelectedDay(0);
    }
    setSelectedWeek(index);
    setIsMenuOpen(!isMenuOpen);
    // TODO - barbellwhip header program page - only show week if trainingProgram.length > 1
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={activeProgram?.programName ? activeProgram?.programName + " - " + selectedLocale.programPage.week + " " + (index + 1) : selectedLocale.programPage.defaultTitle}
                    setIsMenuOpen={setIsMenuOpen}
                    menu={activeProgram?.programName ? true : false}
                  />
              });
  }

  const onScreenLoad = () => {
    // TODO - barbellwhip header program page - only show week if trainingProgram.length > 1
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={activeProgram?.programName ? activeProgram?.programName + " - " + selectedLocale.programPage.week + " " + (selectedWeek + 1) : selectedLocale.programPage.defaultTitle}
                    setIsMenuOpen={setIsMenuOpen}
                    menu={activeProgram?.programName ? true : false}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [activeProgram])


  // TODO - test if putting this in another files fixes the render glitch
  const MenuWeekList = () => (
    <View style={styles(activeTheme).containerDrawer}>
      <View style={styles(activeTheme).rmReviewContainer}>{/* // TODO - check this*/}
        <TouchableOpacity
          style={styles(activeTheme).item} // TODO - check this
          onPress={() => {
            setIsMenuOpen(!isMenuOpen);
            navigation.push("RMReviewPage", {onermOBJ: activeProgram?.oneRMs, weightUnit: activeProgram?.weightUnit});
          }}
        >
          <Text style={styles(activeTheme).RMReview}>{selectedLocale.programPage.rmReviewTitle}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles(activeTheme).weekSelectorContainer}>
        <Text style={styles(activeTheme).titleWeekDrawer}>{selectedLocale.programPage.weekSelectorTitle}</Text>
        <ScrollView persistentScrollbar={true} overScrollMode="never">
          {activeProgram?.trainingProgram?.map((item, index) => {
            return (
              <TouchableOpacity
                key={"MenuWeekListItem" + index}
                style={(index == selectedWeek) ? styles(activeTheme).drawerItemSelected : styles(activeTheme).drawerItem}
                onPress={() => selectWeek({index})}
              >
                <Text style={(index == selectedWeek) ? styles(activeTheme).drawerTextSelected : styles(activeTheme).drawerText}>
                  {selectedLocale.programPage.week} {JSON.stringify(index + 1)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  );
  const menuWeekList = <MenuWeekList />

  const flatListRenderItem = ({ item }) => (
    <ExerciseItem
      onermOBJ={activeProgram?.oneRMs}
      rmId={item.RMid}
      weightUnit={activeProgram.weightUnit}
      exerciseName={item.exerciseName}
      exerciseOBJ={item}
    />
  );

  // TODO - remove this?
  // maybe try this again with something different to prevent the loading glitch
  // if(isInitialRender) {
  //   console.log(isInitialRender);
  //
  //   return <Loading />;
  //   // return null;
  // }

  return (
    <View style={styles(activeTheme).container}>

      {/* TODO - should probably change this "activeProgram?.programName" to something else. maybe activeProgram?.trainingProgram.length ? */}
      {activeProgram?.programName ? (
        <SideMenu
          menu={menuWeekList}
          isOpen={isMenuOpen}
          onChange={closeMenu}
          menuPosition={"right"}
          bounceBackOnOverdraw={false}
          animationFunction={(prop, value) =>
            Animated.spring(prop, {
              toValue: value,
              // friction: 10,
              overshootClamping: true,
              useNativeDriver: true,
              bounciness: 0,
              // stiffness: 1,
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
// export default React.memo(ProgramPage);
