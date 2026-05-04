import React, { useMemo, useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./obWorkoutPageStyles";
import SetCard from "./setCard";

import { useAtomValue } from "jotai";
import { activeThemeAtom, selectedLocaleAtom } from "../../../../helpers/jotai/atoms";
import { useWorkout } from "../../helpers/useWorkout";
import { useBluetooth } from "../../helpers/useBluetooth";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const OBWorkoutPage = ({ navigation }) => {
  const activeTheme = useAtomValue(activeThemeAtom);
  const selectedLocale = useAtomValue(selectedLocaleAtom);
  const s = useMemo(() => styles(activeTheme), [activeTheme]);
  const locale = selectedLocale.openBarbellPage.workout;
  const reviewLocale = selectedLocale.openBarbellPage.exerciseReview;

  const {
    activeWorkout,
    workingSet,
    previousSets,
    startWorkout,
    endSet,
    addRep,
    updateSetField,
    removeRep,
    restoreRep,
    endWorkout,
  } = useWorkout();

  // Connect BLE rep data to workout
  const handleRepReceived = useCallback(
    (isValid: boolean, repData: number[]) => {
      if (activeWorkout) {
        addRep(repData, isValid);
      }
    },
    [activeWorkout, addRep],
  );

  useBluetooth(handleRepReceived);

  // Rest timer
  const [restSeconds, setRestSeconds] = useState(0);
  const lastSetEndTime = previousSets.length > 0 ? previousSets[0]?.endTime : null;

  useEffect(() => {
    if (!lastSetEndTime) {
      setRestSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - new Date(lastSetEndTime).getTime()) / 1000,
      );
      setRestSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSetEndTime]);

  const handleEndWorkout = useCallback(async () => {
    await endWorkout();
    navigation.goBack();
  }, [endWorkout, navigation]);

  // No active workout — show start button
  if (!activeWorkout) {
    return (
      <View style={s.container}>
        <View style={s.emptyContainer}>
          <TouchableOpacity style={s.startButton} onPress={startWorkout}>
            <Text style={s.startButtonText}>{locale.startWorkout}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.listContent}>
        {/* Rest timer */}
        {lastSetEndTime && restSeconds > 0 && (
          <View style={s.restTimerContainer}>
            <Ionicons name="timer-outline" size={18} color={activeTheme.textFaded} />
            <Text style={s.restTimerLabel}>{locale.restTimer}</Text>
            <Text style={s.restTimerText}>{formatTime(restSeconds)}</Text>
          </View>
        )}

        {/* Working set */}
        {workingSet && (
          <SetCard
            set={workingSet}
            isWorkingSet={true}
            onUpdateField={(field, value) =>
              updateSetField(workingSet.setId, field, value)
            }
            onRemoveRep={(repIndex) => removeRep(workingSet.setId, repIndex)}
            onRestoreRep={(repIndex) => restoreRep(workingSet.setId, repIndex)}
          />
        )}

        {/* Previous sets */}
        {previousSets.length > 0 && (
          <>
            <Text style={s.sectionTitle}>{reviewLocale.setHistory}</Text>
            {previousSets.map((set) => (
              <SetCard
                key={set.setId}
                set={set}
                isWorkingSet={false}
                onUpdateField={(field, value) =>
                  updateSetField(set.setId, field, value)
                }
                onRemoveRep={(repIndex) => removeRep(set.setId, repIndex)}
                onRestoreRep={(repIndex) => restoreRep(set.setId, repIndex)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Bottom bar */}
      <View style={s.bottomBar}>
        <TouchableOpacity style={s.newSetButton} onPress={endSet}>
          <Text style={s.newSetButtonText}>{locale.createNewSet}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.endWorkoutButton} onPress={handleEndWorkout}>
          <Text style={s.endWorkoutButtonText}>{locale.endWorkout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OBWorkoutPage;
