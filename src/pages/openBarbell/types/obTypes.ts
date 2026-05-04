export type OBDeviceStatus =
  | "disconnected"
  | "scanning"
  | "connecting"
  | "connected"
  | "bluetoothOff";

export interface OBDevice {
  name: string;
  identifier: string;
}

export interface OBRep {
  repNumber: number;
  averageVelocity: number | null;
  peakVelocity: number | null;
  rangeOfMotion: number | null;
  peakVelocityLocation: number | null;
  peakAcceleration: number | null;
  durationOfLift: number | null;
  isValid: boolean;
  removed: boolean;
  timestamp: string;
  rawData: number[];
}

export interface OBSet {
  setId: string;
  setNumber: number;
  exerciseName: string;
  weight: number | null;
  metric: "kg" | "lbs";
  rpe: string;
  reps: OBRep[];
  tags: string[];
  startTime: string;
  endTime: string | null;
  removed: boolean;
}

export interface OBWorkoutSession {
  sessionId: string;
  date: string;
  sets: OBSet[];
  isActive: boolean;
}

export interface OBExerciseHistory {
  exerciseName: string;
  sessions: {
    sessionId: string;
    date: string;
    sets: OBSet[];
  }[];
}
