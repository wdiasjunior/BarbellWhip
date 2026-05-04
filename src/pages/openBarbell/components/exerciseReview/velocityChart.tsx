import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import styles from "./velocityChartStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import type { OBExerciseHistory } from "../../types/obTypes";

interface IProps {
  history: OBExerciseHistory | null;
}

const VelocityChart = ({ history }: IProps) => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage.exerciseReview;

  const chartData = useMemo(() => {
    if (!history || history.sessions.length === 0) return [];

    return history.sessions.map((session) => {
      // Average velocity across all valid, non-removed reps in this session
      const allReps = session.sets.flatMap((set) =>
        set.reps.filter((r) => r.isValid && !r.removed && r.averageVelocity !== null),
      );
      const avgVel =
        allReps.length > 0
          ? allReps.reduce((sum, r) => sum + (r.averageVelocity ?? 0), 0) / allReps.length
          : 0;

      const date = new Date(session.date);
      const label = `${date.getMonth() + 1}/${date.getDate()}`;

      return {
        value: parseFloat(avgVel.toFixed(2)),
        label,
        dataPointText: avgVel > 0 ? avgVel.toFixed(2) : undefined,
      };
    });
  }, [history]);

  if (chartData.length === 0) {
    return (
      <View style={s.container}>
        <Text style={s.title}>{locale.velocityChart}</Text>
        <Text style={s.noDataText}>{locale.noData}</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>{locale.velocityChart} (m/s)</Text>
      <LineChart
        data={chartData}
        height={150}
        spacing={60}
        color={activeTheme.textHighlight}
        dataPointsColor={activeTheme.active}
        textColor={activeTheme.text}
        xAxisLabelTextStyle={{ color: activeTheme.textFaded, fontSize: 10 }}
        yAxisTextStyle={{ color: activeTheme.textFaded, fontSize: 10 }}
        rulesColor={activeTheme.backgroundPrimary}
        backgroundColor={activeTheme.backgroundSecondary}
        isAnimated
        curved
        thickness={2}
        startFillColor={activeTheme.activeTransparent}
        endFillColor={activeTheme.backgroundSecondary}
        areaChart
      />
    </View>
  );
};

export default VelocityChart;
