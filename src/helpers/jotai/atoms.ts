import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { themes } from "../../themes/";
import { locales } from "../../db/locales/";

const storage = createJSONStorage(() => AsyncStorage);

// Active Program
export const activeProgramAtom = atomWithStorage("activeProgramAtom", {}, storage);
export const activeProgramNameAtom = atomWithStorage("activeProgramNameAtom", "", storage);
export const activeProgramURIAtom = atomWithStorage("activeProgramURIAtom", "", storage);


// Program page
export const programPageSelectedDayAtom = atomWithStorage("programPageSelectedDayAtom", 0, storage);
export const programPageSelectedWeekAtom = atomWithStorage("programPageSelectedWeekAtom", 0, storage);


// 1RM Calculator Page
export const calculatorPageRepsAtom = atomWithStorage("calculatorPageRepsAtom", 1, storage);
export const calculatorPageWeightAtom = atomWithStorage("calculatorPageWeightAtom", 150, storage);
export const calculatorPageWeightUnitAtom = atomWithStorage("calculatorPageWeightUnitAtom", "kg", storage);


// Plate Math Page
export const plateMathPageWeightAtom = atomWithStorage("plateMathPageWeightAtom", 150, storage);
export const plateMathWeightUnitAtom = atomWithStorage("plateMathWeightUnitAtom", false, storage); // false == kg == left, true == lbs == right
export const plateMathShowBumperAtom = atomWithStorage("plateMathShowBumperAtom", false, storage);
export const plateMathShowColoredPlatesAtom = atomWithStorage("plateMathShowColoredPlatesAtom", true, storage);
export const plateMathBarWeightAtom = atomWithStorage("plateMathBarWeightAtom", {
  lbs: 45,
  kg: 20,
}, storage);
export const plateMathWeightRackAtom = atomWithStorage("plateMathWeightRackAtom", {
  kg: {
    50   : 0,
    25   : 6,
    20   : 6,
    15   : 2,
    10   : 2,
    5    : 2,
    2.5  : 2,
    2    : 0,
    1.5  : 0,
    1.25 : 2,
    1    : 0,
    0.5  : 0,
  },
  lbs: {
    100  : 0,
    55   : 0,
    45   : 6,
    35   : 2,
    25   : 2,
    10   : 2,
    5    : 2,
    2.5  : 2,
    1.25 : 2,
  }
}, storage);
export const plateMathBumperPlatesRackAtom = atomWithStorage("plateMathBumperPlatesRackAtom", {
  kg: {
    25 : 0,
    20 : 0,
    15 : 2,
    10 : 2,
    5  : 2
  },
  lbs: {
    55 : 0,
    45 : 0,
    35 : 2,
    25 : 2,
    10 : 2
  },
}, storage);


// Program Editor Page
export const programEditorDataAtom = atomWithStorage("programEditorDataAtom", {
  programName: "",
  weightUnit: "kg",
  oneRMs: [],
  trainingProgram: [ { week: new Array(7).fill({ day:[] }) } ],
}, storage);
export const wasProgramSavedAtom = atomWithStorage("wasProgramSavedAtom", false, storage);
export const selectedDayAtom = atom(0);
export const selectedWeekAtom = atom(0);
export const programEditorModeAtom = atom<"Create" | "Edit">("Create");
export const programNameForActionAtom = atom("");


// Settings Page
export const settingsPageWeightRoundAtom = atomWithStorage("settingsPageWeightRoundAtom", true, storage);
export const settingsPage1RMFormulasAtom = atomWithStorage("settingsPage1RMFormulasAtom", {
  epley: true,
  brzycki: true,
  lombardi: true,
  mayhew: true,
  mcglothin: true,
  oconner: true,
  wathen: true,
}, storage);


// Theme
export const activeThemeIdAtom = atomWithStorage("activeThemeIdAtom", "dark", storage);
export const activeThemeAtom = atom((get) => {
  const themeId = get(activeThemeIdAtom);
  const themeIndex = themes.findIndex((t) => t.id === themeId);
  if(themeIndex >= 0) {
    return themes[themeIndex].theme;
  } else {
    return themes[0].theme;
  }
});

// Locale
export const selectedLocaleIdAtom = atomWithStorage("selectedLocaleIdAtom", "english", storage);
export const selectedLocaleAtom = atom((get) => {
  const localeId = get(selectedLocaleIdAtom);
  const localeIndex = locales.findIndex((t) => t.id === localeId);
  if(localeIndex >= 0) {
    return locales[localeIndex].locale;
  } else {
    return locales[0].locale;
  }
});
