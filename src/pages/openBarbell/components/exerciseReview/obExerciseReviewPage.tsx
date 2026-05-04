import React, { useMemo, useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./obExerciseReviewPageStyles";
import TopTabBar from "../../../../sharedComponents/topTabBar/topTabBar";
import VelocityChart from "./velocityChart";
import SetHistoryList from "./setHistoryList";
import Loading from "../../../../sharedComponents/loading/loading";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import * as obStorage from "../../helpers/obStorage";
import type { OBExerciseHistory } from "../../types/obTypes";

const OBExerciseReviewPage = () => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage.exerciseReview;

  const [exerciseNames, setExerciseNames] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentHistory, setCurrentHistory] = useState<OBExerciseHistory | null>(null);
  const [loading, setLoading] = useState(true);

  // Load exercise names on mount
  useEffect(() => {
    const load = async () => {
      const names = await obStorage.getExerciseNames();
      setExerciseNames(names);
      setLoading(false);
    };
    load();
  }, []);

  // Load history when selected tab changes
  useEffect(() => {
    if (exerciseNames.length === 0) {
      setCurrentHistory(null);
      return;
    }

    const loadHistory = async () => {
      const history = await obStorage.loadExerciseHistory(exerciseNames[selectedTab]);
      setCurrentHistory(history);
    };
    loadHistory();
  }, [selectedTab, exerciseNames]);

  const handleSelectTab = useCallback((index: number) => {
    setSelectedTab(index);
  }, []);

  if (loading) return <Loading />;

  if (exerciseNames.length === 0) {
    return (
      <View style={s.container}>
        <View style={s.noDataContainer}>
          <Text style={s.noDataText}>{locale.noData}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <TopTabBar
        days={exerciseNames.length}
        labels={exerciseNames}
        selectDay={handleSelectTab}
        selectedWeek={0}
        isProgramPage={false}
      />
      <ScrollView contentContainerStyle={s.scrollContent}>
        <VelocityChart history={currentHistory} />
        <SetHistoryList history={currentHistory} />
      </ScrollView>
    </View>
  );
};

export default OBExerciseReviewPage;
