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
  labels?: string[];
}

const TopTabBar = (props: IProps) => {

  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const selectedDay = useAtomValue<number>(programPageSelectedDayAtom);

  const s = useMemo(() => styles(activeTheme), [activeTheme]);

  const useLabels = !!props.labels;
  const tabCount = useLabels ? props.labels!.length : props.days;
  const tabs = Array.from(Array(tabCount).keys());

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
    if (!useLabels && props.isProgramPage) {
      setSelected(0);
      props.selectDay(0);
      if (ref.current != null) {
        ref.current.scrollTo({x: dataSourceCords[0 - 1], y: 0, animated: true});
      }
    }
  }, [props.selectedWeek])

  useEffect(() => {
    if (useLabels) {
      setSelected(0);
      props.selectDay(0);
    } else {
      setSelected(!props.isProgramPage ? 0 : selectedDay);
      props.selectDay(!props.isProgramPage ? 0 : selectedDay);
    }
    if (ref.current != null) {
      ref.current.scrollTo({x: dataSourceCords[0 - 1], y: 0, animated: true});
    }
  }, [])

  useEffect(() => {
    if (!useLabels && props.isProgramPage) {
      selectTab(selectedDay);
    }
  }, [selectedDay])

  const scrollToTabOnLoad = () => {
    if (ref.current != null && !useLabels && props.isProgramPage) {
      ref.current.scrollTo({x: dataSourceCords[selectedDay - 2], y: 0, animated: true});
    }
  }

  const getTabLabel = (index: number): string => {
    if (useLabels) {
      return props.labels![index];
    }
    return `${selectedLocale.programPage.day} ${index + 1}`;
  };

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
        {tabs.map((_, index) => {
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
              <Text
                style={(index === selected) ? s.textSelected : s.text}
                numberOfLines={1}
              >
                {getTabLabel(index)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TopTabBar;
