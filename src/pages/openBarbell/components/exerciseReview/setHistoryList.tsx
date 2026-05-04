import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./setHistoryListStyles";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import type { OBExerciseHistory, OBSet } from "../../types/obTypes";

interface IProps {
  history: OBExerciseHistory | null;
}

const SetHistoryList = ({ history }: IProps) => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage;

  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());

  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }
      return next;
    });
  };

  if (!history || history.sessions.length === 0) {
    return (
      <View style={s.container}>
        <Text style={s.title}>{locale.exerciseReview.setHistory}</Text>
        <Text style={s.noDataText}>{locale.exerciseReview.noData}</Text>
      </View>
    );
  }

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSetAvgVelocity = (set: OBSet): string => {
    const validReps = set.reps.filter((r) => r.isValid && !r.removed && r.averageVelocity !== null);
    if (validReps.length === 0) return "--";
    const avg = validReps.reduce((sum, r) => sum + (r.averageVelocity ?? 0), 0) / validReps.length;
    return avg.toFixed(2);
  };

  // Show sessions in reverse chronological order
  const sortedSessions = [...history.sessions].reverse();

  return (
    <View style={s.container}>
      <Text style={s.title}>{locale.exerciseReview.setHistory}</Text>
      {sortedSessions.map((session) => {
        const isExpanded = expandedSessions.has(session.sessionId);
        return (
          <View key={session.sessionId} style={s.sessionContainer}>
            <TouchableOpacity
              style={s.sessionHeader}
              onPress={() => toggleSession(session.sessionId)}
            >
              <Text style={s.sessionDate}>{formatDate(session.date)}</Text>
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={activeTheme.textFaded}
              />
            </TouchableOpacity>

            {isExpanded &&
              session.sets.map((set) => (
                <View key={set.setId}>
                  <View style={s.setRow}>
                    <Text style={s.setInfo}>
                      {locale.workout.set} {set.setNumber}
                      {set.weight !== null ? ` - ${set.weight} ${set.metric}` : ""}
                    </Text>
                    <Text style={s.setDetail}>
                      {set.reps.filter((r) => r.isValid && !r.removed).length} {locale.workout.rep}s
                      {" | "}{locale.workout.avgVelocity}: {getSetAvgVelocity(set)} m/s
                    </Text>
                  </View>
                  {set.reps
                    .filter((r) => r.isValid && !r.removed)
                    .map((rep, i) => (
                      <View key={i} style={s.repDetailRow}>
                        <Text style={s.repDetailText}>#{i + 1}</Text>
                        <Text style={s.repDetailText}>
                          {rep.averageVelocity ?? "--"} m/s
                        </Text>
                        <Text style={s.repDetailText}>
                          {rep.peakVelocity ?? "--"} m/s
                        </Text>
                        <Text style={s.repDetailText}>
                          {rep.rangeOfMotion ?? "--"} mm
                        </Text>
                      </View>
                    ))}
                </View>
              ))}
          </View>
        );
      })}
    </View>
  );
};

export default SetHistoryList;
