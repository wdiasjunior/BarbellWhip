import { deepClone } from "./deepClone";
import type { TrainingProgramFile } from "../db/programs/programTypings"

export function trainingProgramCleanUp(obj: TrainingProgramFile) {
  let cleanObj: TrainingProgramFile = deepClone(obj);

  if(cleanObj.oneRMs.length > 0) {
    cleanObj.oneRMs = cleanObj.oneRMs.filter(oneRM => oneRM.name !== "" && oneRM.weight !== "");
  }

  if(cleanObj.trainingProgram.length > 0) {
    cleanObj.trainingProgram.forEach(program => {
      program.week.forEach(week => {
        week.day.forEach(day => {
          day.set = day.set.filter(set => !Object.values(set).every(x => x === ""));
        });
        week.day = week.day.filter(day => day.set.length > 0);
      });
      program.week = program.week.filter(week => week.day.length > 0);
    });
    cleanObj.trainingProgram = cleanObj.trainingProgram.filter(program => program.week.length > 0);
  }

  return cleanObj;
}
