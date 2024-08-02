interface TrainingProgramFile {
  programName: string;
  weightUnit: string;
  oneRMs: OneRMs[];
  trainingProgram: TrainingProgram[];
}

interface OneRMs {
  id: string;
  name: string;
  weight: string;
}

interface TrainingProgram {
  week: Week[];
}

interface Week {
  day: DayExercises[];
}

interface DayExercises {
  RMid: string;
  exerciseName: string;
  set: ExerciseSet[];
}

interface ExerciseSet {
  exerciseName: string;
  sets: string;
  reps: string;
  percentage: string;
  weight: string;
  rpe: string;
  tempo: string;
  rest: string;
  altExercise1: string;
  altExercise2: string;
  description: string;
}
