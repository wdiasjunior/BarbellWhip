import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { themes } from "../../themes/";
import { locales } from "../../db/locales/";

const storage = createJSONStorage(() => AsyncStorage);

// Active Program
const activeProgramAtom = atomWithStorage("activeProgramAtom", {}, storage);
const activeProgramNameAtom = atomWithStorage("activeProgramNameAtom", "", storage);

// Program page
const programPageSelectedDayAtom = atomWithStorage("programPageSelectedDayAtom", 0, storage);
const programPageSelectedWeekAtom = atomWithStorage("programPageSelectedWeekAtom", 0, storage);

// 1RM Calculator Page
const calculatorPageRepsAtom = atomWithStorage("calculatorPageReps", 1, storage);
const calculatorPageWeightAtom = atomWithStorage("calculatorPageWeight", 150, storage);
const calculatorPageWeightUnitAtom = atomWithStorage("calculatorPageWeightUnit", "kg", storage);

// Plate Math Page
// const plateMathPageWeight = atomWithStorage("plateMathPageWeight", 150, storage);
// const plateMathWeightUnit = atomWithStorage("plateMathWeightUnit", "kg", storage);
// const plateMathSelectedBar = atomWithStorage("plateMathSelectedBar", 1, storage);
// const plateMathWeightRack = atomWithStorage("plateMathWeightRack", 1, storage);

// Settings Page
// const settingsPageWeightRoundAtom = atomWithStorage("settingsPageWeightRound", true, storage);
// object with keys for every calc funtion and every value is true by defalut
// const settingsPage1RMCalculationFormulasAtom = atomWithStorage("settingsPage1RMCalculationFormulas", {}, storage);

// Theme
const activeThemeIdAtom = atomWithStorage("activeThemeIdAtom", "chakraUI", storage);
const activeThemeAtom = atom((get) => {
  const themeId = get(activeThemeIdAtom);
  const themeIndex = themes.findIndex((t) => t.id === themeId);
  if (themeIndex >= 0) {
    return themes[themeIndex].theme;
  } else {
    return themes[0].theme;
  }
});

// Locale
const selectedLocaleIdAtom = atomWithStorage("selectedLocaleIdAtom", "english", storage);
const selectedLocaleAtom = atom((get) => {
  const localeId = get(selectedLocaleIdAtom);
  const localeIndex = locales.findIndex((t) => t.id === localeId);
  if (localeIndex >= 0) {
    return locales[localeIndex].locale;
  } else {
    return locales[0].locale;
  }
});

export {
  activeProgramAtom,
  activeProgramNameAtom,
  programPageSelectedDayAtom,
  programPageSelectedWeekAtom,
  calculatorPageRepsAtom,
  calculatorPageWeightAtom,
  calculatorPageWeightUnitAtom,
  activeThemeIdAtom,
  activeThemeAtom,
  selectedLocaleIdAtom,
  selectedLocaleAtom
};
