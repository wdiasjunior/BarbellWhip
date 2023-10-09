interface Locales {
  id: string;
  name: string;
  locale: Locale;
}

interface Locale {
  programPage: {
    defaultTitle: string;
    title: string;
    week: string;
    day: string;
    rmReviewTitle: string;
    rmReviewWeightLabel: string;
    weekSelectorTitle: string;
    noActiveProgramTextTitle: string;
    noActiveProgramTextSubtitle: string;
    exerciseInfo: {
      title: string;
      sets: string;
      reps: string;
      weightLabel: string;
      percentage: string;
      rest: string;
      altExercise1: string;
      altExercise2: string;
      description: string;
    }
  }
  calculatorPage: {
    title: string;
    weightLifted: string;
    repsPerformed: string;
    rmTitle: string;
    rmPercentageTitle: string;
    textWarning: string;
  }
  plateMathPage: {
    title: string;
    weightLabel: string;
    currentBarWeightLabel: string;
    bumperToggleLabel: string;
    weightRackPage: {
      title: string;
      weightUnitLabel: string;
      barWeightTitle: string;
      plateRackTitle: string;
      bumperPlatesRackTitle: string;
      colorCodedPlatesTitle: string;
      collarsSwitchTitle: string;
    }
  }
  programEditorPage: {
    title: string;
    noProgramListTextTitle: string;
    noProgramListTextSubtitle: string;
    importErrorMessage: string;
    modal: {
      setActive: string;
      edit: string;
      share: string;
      makeCopy: string;
      delete: string;
    }
    programEditorStep1: {
      title: string;
      title2: string;
      tabTitle: string;
      programName: string;
      add1RMexerciseButton: string;
      RMexercise: string;
      weightLabel: string;
    }
    programEditorStep2: {
      title: string;
      title2: string;
      tabTitle: string;
      addWeekButton: string;
      week: string;
    }
    programEditorStep3: {
      title: string;
      title2: string;
      tabTitle: string;
      emptyDayInfo: string;
      addExerciseButton: string;
      simpleExerciseModalLabel: string;
    }
    exerciseEditorPage: {
      title: string;
      exerciseNameInfo: string;
      exerciseVariation: string;
      sets: string;
      reps: string;
      percentage: string;
      weightLabel: string;
      rest: string;
      altExercise1: string;
      altExercise2: string;
      description: string;
      addExerciseButton: string;
    }
  }
  settingsPage: {
    title: string;
    themeSelectorTitle: string;
    languageSelectorTitle: string;
  }
  numberInputModal: {
    cancelButtonLabel: string;
  }
}
