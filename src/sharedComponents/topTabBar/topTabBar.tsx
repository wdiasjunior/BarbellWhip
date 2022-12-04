import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import styles from './topTabBarStyles';

import { useAtom } from 'jotai';
import { programPageSelectedDayAtom } from "../../helpers/jotai/atomsWithStorage";
import { activeThemeAtom } from "../../helpers/jotai/atomsWithStorage";

interface Props {
  days: number;
  selectDay(): any;
  setFirstTab(): any;
  programPage: boolean;
}

const TopTabBar = (props: Props) => {

  const [activeTheme, ] = useAtom(activeThemeAtom);
  const [selectedDay, setSelectedDay] = useAtom(programPageSelectedDayAtom);

  const days = Array.from(Array(props.days).keys());

  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const ref = useRef();
  const [selected, setSelected] = useState(0);
  const selectTab = (index) => {
    setSelected(index);
    props.selectDay(index);
    if(ref.current != null) {
      ref.current.scrollTo({x: dataSourceCords[index - 2], y: 0, animated: true});
    }
  }

  useEffect(() => {
    if(props.programPage) {
      setSelected(0);
      props.selectDay(0);
      if(ref.current != null) {
        ref.current.scrollTo({x: dataSourceCords[0 - 1], y: 0, animated: true});
      }
    }
  }, [props.setFirstTab])

  useEffect(() => {
    setSelected(!props.programPage ? 0 : selectedDay);
    props.selectDay(!props.programPage ? 0 : selectedDay);
    if(ref.current != null) {
      ref.current.scrollTo({x: dataSourceCords[0 - 1], y: 0, animated: true});
    }
  }, [])

  const scrollToTabOnLoad = () => {
    if(ref.current != null && props.programPage) {
      ref.current.scrollTo({x: dataSourceCords[selectedDay - 2], y: 0, animated: true});
    }
  }

  return (
    <View style={styles(activeTheme).container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        ref={ref}
        onContentSizeChange={scrollToTabOnLoad}
        overScrollMode="never"
      >
        {days.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={(index == selected) ? styles(activeTheme).tabItemSelected : styles(activeTheme).tabItem}
              onPress={() => selectTab(index)}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                dataSourceCords[index] = layout.x;
                setDataSourceCords(dataSourceCords);
              }}
            >
              <Text style={(index === selected) ? styles(activeTheme).textSelected : styles(activeTheme).text}>
                Day {JSON.stringify(index + 1)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TopTabBar;
