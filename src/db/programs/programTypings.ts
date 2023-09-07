export interface TrainingProgramFile {
  programName: string;
  weightUnit: string;
  oneRMs: OneRMs[],
  trainingProgram: TrainingProgramData[]
}

export interface OneRMs {
  id: string;
  name: string;
  weight: string;
}

export interface TrainingProgramData {
  week: Week[]
}

export interface Week {
  day: DayExercises[];
}

export interface DayExercises {
  RMid: string;
  exerciseName: string;
  set: ExerciseSet[];
}

export interface ExerciseSet {
  exerciseName: string;
  sets: string;
  reps: string;
  percentage: string;
  rpe: string;
  tempo: string;
  rest: string;
  altExercise1: string;
  altExercise2: string;
  description: string;
}
