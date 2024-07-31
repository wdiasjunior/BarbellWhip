export function checkProgramEditorData(programData: TrainingProgramFile): boolean {
  if(
    programData.programName === "" &&
    programData.oneRMs.length === 0 &&
    programData.trainingProgram.length === 1 &&
    programData.trainingProgram[0].week.length === 7 &&
    programData.trainingProgram[0].week[0].day.length === 0
  ) {
    return true;
  }
  return false;
}
