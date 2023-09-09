import { atom } from "jotai";

const programEditorDataAtom = atom({
  programName: "",
  weightUnit: "kg",
  oneRMs: [],
  trainingProgram: [ { week: new Array(7).fill({ day:[] }) } ]
});

const selectedDayAtom = atom(0);

const selectedWeekAtom = atom(0);

const programEditorModeAtom = atom<"Create" | "Edit">("Create");

const programNameForActionAtom = atom("");

export {
  programEditorDataAtom,
  selectedDayAtom,
  selectedWeekAtom,
  programEditorModeAtom,
  programNameForActionAtom,
};
