import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { obActiveWorkoutAtom, obWeightUnitAtom } from "./obAtoms";
import * as RepDataMap from "./repDataMap";
import * as obStorage from "./obStorage";
import type { OBWorkoutSession, OBSet, OBRep, OBExerciseHistory } from "../types/obTypes";

const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

const createEmptySet = (setNumber: number, metric: "kg" | "lbs"): OBSet => ({
  setId: generateId(),
  setNumber,
  exerciseName: "",
  weight: null,
  metric,
  rpe: "",
  reps: [],
  tags: [],
  startTime: new Date().toISOString(),
  endTime: null,
  removed: false,
});

export const useWorkout = () => {
  const [activeWorkout, setActiveWorkout] = useAtom(obActiveWorkoutAtom);
  const isLbs = useAtomValue(obWeightUnitAtom);
  const metric = isLbs ? "lbs" : "kg";

  const startWorkout = useCallback(() => {
    const session: OBWorkoutSession = {
      sessionId: generateId(),
      date: new Date().toISOString(),
      sets: [createEmptySet(1, metric)],
      isActive: true,
    };
    setActiveWorkout(session);
  }, [metric, setActiveWorkout]);

  const getWorkingSet = (): OBSet | null => {
    if (!activeWorkout || activeWorkout.sets.length === 0) return null;
    return activeWorkout.sets[activeWorkout.sets.length - 1];
  };

  const getPreviousSets = (): OBSet[] => {
    if (!activeWorkout || activeWorkout.sets.length <= 1) return [];
    return activeWorkout.sets.slice(0, -1).reverse();
  };

  const endSet = useCallback(() => {
    if (!activeWorkout) return;
    const sets = [...activeWorkout.sets];
    const lastSet = sets[sets.length - 1];
    if (lastSet) {
      sets[sets.length - 1] = { ...lastSet, endTime: new Date().toISOString() };
    }
    const newSet = createEmptySet(sets.length + 1, metric);
    setActiveWorkout({
      ...activeWorkout,
      sets: [...sets, newSet],
    });
  }, [activeWorkout, metric, setActiveWorkout]);

  const addRep = useCallback(
    (rawData: number[], isValid: boolean) => {
      if (!activeWorkout) return;

      const rep: OBRep = {
        repNumber: RepDataMap.repNumber(rawData) ?? 0,
        averageVelocity: RepDataMap.averageVelocity(rawData),
        peakVelocity: RepDataMap.peakVelocity(rawData),
        rangeOfMotion: RepDataMap.rangeOfMotion(rawData),
        peakVelocityLocation: RepDataMap.peakVelocityLocation(rawData),
        peakAcceleration: RepDataMap.peakAcceleration(rawData),
        durationOfLift: RepDataMap.durationOfLift(rawData),
        isValid,
        removed: false,
        timestamp: new Date().toISOString(),
        rawData,
      };

      const sets = [...activeWorkout.sets];
      const workingSet = { ...sets[sets.length - 1] };
      workingSet.reps = [...workingSet.reps, rep];
      sets[sets.length - 1] = workingSet;

      setActiveWorkout({ ...activeWorkout, sets });
    },
    [activeWorkout, setActiveWorkout],
  );

  const updateSetField = useCallback(
    (setId: string, field: keyof OBSet, value: any) => {
      if (!activeWorkout) return;

      const sets = activeWorkout.sets.map((s) =>
        s.setId === setId ? { ...s, [field]: value } : s,
      );
      setActiveWorkout({ ...activeWorkout, sets });
    },
    [activeWorkout, setActiveWorkout],
  );

  const removeRep = useCallback(
    (setId: string, repIndex: number) => {
      if (!activeWorkout) return;

      const sets = activeWorkout.sets.map((s) => {
        if (s.setId !== setId) return s;
        const reps = s.reps.map((r, i) => (i === repIndex ? { ...r, removed: true } : r));
        return { ...s, reps };
      });
      setActiveWorkout({ ...activeWorkout, sets });
    },
    [activeWorkout, setActiveWorkout],
  );

  const restoreRep = useCallback(
    (setId: string, repIndex: number) => {
      if (!activeWorkout) return;

      const sets = activeWorkout.sets.map((s) => {
        if (s.setId !== setId) return s;
        const reps = s.reps.map((r, i) => (i === repIndex ? { ...r, removed: false } : r));
        return { ...s, reps };
      });
      setActiveWorkout({ ...activeWorkout, sets });
    },
    [activeWorkout, setActiveWorkout],
  );

  const endWorkout = useCallback(async () => {
    if (!activeWorkout) return;

    // Finalize the session
    const finalSession: OBWorkoutSession = {
      ...activeWorkout,
      isActive: false,
    };

    // Save the full session
    await obStorage.saveWorkoutSession(finalSession);

    // Organize sets by exercise and save per-exercise history
    const exerciseMap = new Map<string, OBSet[]>();
    for (const set of finalSession.sets) {
      if (!set.exerciseName || set.removed) continue;
      const name = set.exerciseName.toLowerCase().trim();
      if (!exerciseMap.has(name)) {
        exerciseMap.set(name, []);
      }
      exerciseMap.get(name)!.push(set);
    }

    for (const [exerciseName, sets] of exerciseMap) {
      const existing = await obStorage.loadExerciseHistory(exerciseName);
      const history: OBExerciseHistory = existing || {
        exerciseName,
        sessions: [],
      };
      history.sessions.push({
        sessionId: finalSession.sessionId,
        date: finalSession.date,
        sets,
      });
      await obStorage.saveExerciseHistory(exerciseName, history);
    }

    // Clear active workout
    setActiveWorkout(null);
  }, [activeWorkout, setActiveWorkout]);

  return {
    activeWorkout,
    workingSet: getWorkingSet(),
    previousSets: getPreviousSets(),
    startWorkout,
    endSet,
    addRep,
    updateSetField,
    removeRep,
    restoreRep,
    endWorkout,
  };
};
