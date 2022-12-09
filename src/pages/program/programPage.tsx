import React, { useRef, useState, useLayoutEffect, } from "react";
import { Text, View, FlatList, Button, ScrollView, TouchableOpacity, Animated } from 'react-native';
import SideMenu from "react-native-side-menu-updated";

import Header from "../../sharedComponents/header/header";
import TopTabBar from "../../sharedComponents/topTabBar/topTabBar";
// import Loading from "../../sharedComponents/loading/loading";
import ExerciseItem from "./components/exerciseItem/exerciseItem";

import { useAtom } from 'jotai';
import { activeThemeAtom, selectedLocaleAtom, activeProgramAtom, programPageSelectedDayAtom, programPageSelectedWeekAtom } from "../../helpers/jotai/atomsWithStorage";

import { useInitialRender } from "../../helpers/useInitialRender";

import styles from './programPageStyles';

import defaultProgramData from "../../db/programs/strengthV4.json";

const ProgramPage = ({ navigation }) => {

  const isInitialRender = useInitialRender();

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedLocale, ] = useAtom(selectedLocaleAtom);

  const [activeProgramData, setActiveProgramData] = useAtom(activeProgramAtom);
  const data = activeProgramData.trainingProgram ? activeProgramData : defaultProgramData; // TODO - change this so it doesn't break depending on the program that's loaded

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const closeMenu = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  }

  const [selectedDay, setSelectedDay] = useAtom(programPageSelectedDayAtom);
  const [selectedWeek, setSelectedWeek] = useAtom(programPageSelectedWeekAtom);

  const selectDay = (day) => {
    setSelectedDay(day);
  }
  const selectWeek = ({ index }) => {
    if(selectedWeek != index) {
      setSelectedDay(0);
    }
    setSelectedWeek(index);
    setIsMenuOpen(!isMenuOpen);
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={data?.programName + ' - ' + selectedLocale.programPage.week + ' ' + (index + 1)}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    menu={true}
                  />
              });
  }

  const onScreenLoad = () => {
    navigation.setOptions({ headerTitle: () =>
                  <Header
                    title={data?.programName + ' - ' + selectedLocale.programPage.week + ' ' + (selectedWeek + 1)}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    menu={true}
                  />
              });
  }

  useLayoutEffect(() => {
    onScreenLoad();
  }, [])

  useLayoutEffect(() => {
    onScreenLoad();
  }, [activeProgramData])

  const MenuWeekList = () => (
    <View style={styles(activeTheme).containerDrawer}>

      <View style={styles(activeTheme).rmInputContainer}>
        <TouchableOpacity
          style={styles(activeTheme).item}
          onPress={() => {
            setIsMenuOpen(!isMenuOpen);
            navigation.push('RMReviewPage', {onermOBJ: data?.oneRMs, weightUnit: data?.weightUnit});
          }}
        >
          <Text style={styles(activeTheme).RMReview}>{selectedLocale.programPage.rmReviewTitle}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles(activeTheme).weekSelectorContainer}>
        <Text style={styles(activeTheme).titleWeekDrawer}>{selectedLocale.programPage.weekSelectorTitle}</Text>
        <ScrollView persistentScrollbar={true} overScrollMode="never">
          {data?.trainingProgram?.map((item, index) => {
            return (
              <TouchableOpacity key={index}
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
      onermOBJ={data?.oneRMs}
      rmId={item.RMid}
      weightUnit={data.weightUnit}
      navigation={navigation}
      exerciseName={item.exerciceName}
      data={item}
    />
  );

  // if(isInitialRender) {
  //   console.log(isInitialRender);
  //
  //   return <Loading />;
  //   // return null;
  // }

  return (
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
          setFirstTab={selectedWeek}
          selectDay={setSelectedDay}
          days={data?.trainingProgram[selectedWeek]?.week?.length}
          programPage={true}
        />

        <FlatList
          data={data?.trainingProgram[selectedWeek]?.week[selectedDay]?.day}
          renderItem={flatListRenderItem}
          keyExtractor={item => item.exerciceName}
        />

      </View>
    </SideMenu>
  );
}

export default ProgramPage;
// export default React.memo(ProgramPage);
