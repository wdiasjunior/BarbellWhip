import React, { useState, useEffect, useRef, useMemo } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import styles from "./topTabBarStyles";

import { useAtomValue } from "jotai";
import { programPageSelectedDayAtom } from "../../helpers/jotai/atoms";
import { activeThemeAtom, selectedLocaleAtom } from "../../helpers/jotai/atoms";

interface IProps {
  days: number;
  selectDay: (day: number) => void;
  selectedWeek: number;
  isProgramPage: boolean;
}

const TopTabBar = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const selectedDay = useAtomValue<number>(programPageSelectedDayAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const days = Array.from(Array(props.days).keys());

  const [dataSourceCords, setDataSourceCords] = useState<Array<number>>([]);
  const ref = useRef();
  const [selected, setSelected] = useState(0);
  const selectTab = (index) => {
    setSelected(index);
    props.selectDay(index);
    if (ref.current != null) {
      ref.current.scrollTo({x: dataSourceCords[index - 2], y: 0, animated: true});
    }
  }

  useEffect(() => {
    if (props.isProgramPage) {
      setSelected(0);
      props.selectDay(0);
      if (ref.current != null) {
        ref.current.scrollTo({x: dataSourceCords[0 - 1], y: 0, animated: true});
      }
    }
  }, [props.selectedWeek])

  useEffect(() => {
    setSelected(!props.isProgramPage ? 0 : selectedDay);
    props.selectDay(!props.isProgramPage ? 0 : selectedDay);
    if (ref.current != null) {
      ref.current.scrollTo({x: dataSourceCords[0 - 1], y: 0, animated: true});
    }
  }, [])

  useEffect(() => {
    if (props.isProgramPage) {
      selectTab(selectedDay);
    }
  }, [selectedDay])

  const scrollToTabOnLoad = () => {
    if (ref.current != null && props.isProgramPage) {
      ref.current.scrollTo({x: dataSourceCords[selectedDay - 2], y: 0, animated: true});
    }
  }

  return (
    <View style={s.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        ref={ref}
        onContentSizeChange={scrollToTabOnLoad}
        overScrollMode="never"
      >
        {days.map((_, index) => {
          return (
            <TouchableOpacity
              key={"TopTabBar" + index}
              style={(index == selected) ? s.tabItemSelected : s.tabItem}
              onPress={() => selectTab(index)}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setDataSourceCords(prev => {
                  const next = [...prev];
                  next[index] = layout.x;
                  return next;
                });
              }}
            >
              <Text style={(index === selected) ? s.textSelected : s.text}>
                {selectedLocale.programPage.day} {JSON.stringify(index + 1)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TopTabBar;
