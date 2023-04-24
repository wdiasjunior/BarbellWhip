import { atom } from "jotai";

const programEditorDataAtom = atom({
  programName: "",
  weightUnit: "kg",
  oneRMs: [],
  trainingProgram: [ { week: new Array(7).fill({ day:[] }) } ]
});

const selectedDayAtom = atom(0);

const selectedWeekAtom = atom(0);

const programEditorModeAtom = atom("Create");

export { programEditorDataAtom, selectedDayAtom, selectedWeekAtom, programEditorModeAtom };
