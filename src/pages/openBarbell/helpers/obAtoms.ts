import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { OBDeviceStatus, OBDevice, OBWorkoutSession } from "../types/obTypes";

const storage = createJSONStorage(() => AsyncStorage);

// Device state (runtime only — reset on app restart)
export const obDeviceStatusAtom = atom<OBDeviceStatus>("disconnected");
export const obConnectedDeviceAtom = atom<OBDevice | null>(null);
export const obScannedDevicesAtom = atom<OBDevice[]>([]);

// Active workout (persisted — survives app restart)
export const obActiveWorkoutAtom = atomWithStorage<OBWorkoutSession | null>("obActiveWorkoutAtom", null, storage);

// Weight unit preference (false=kg, true=lbs — matches existing pattern)
export const obWeightUnitAtom = atomWithStorage("obWeightUnitAtom", false, storage);

// Exercise review tab selection (runtime only)
export const obSelectedExerciseTabAtom = atom<number>(0);
