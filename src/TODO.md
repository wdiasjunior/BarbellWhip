# TODO
## review last commits changes, finish the TODOs and test the app

- jotai - change this `const [, setValue] = useAtom(valueAtom)` to useSetAtom to increase performance (does this even make a difference)
  - https://jotai.org/docs/api/core#use-set-atom

- add logo to splash screen and app icon
- reduce splash screen time (it's probably just my phone that's slow)
- go through TODO comments

## calculator page
  - kg - lbs switch
  - add settings screen (?)
    - checkboxes to choose which formulas to calculate 1rm from (?)
  - implement rpe calculator ? https://www.rpecalculator.com/ (?)
  - get inspiration from the juggernaut app
  - calculator tab screen - add topTabBar to switch between RPE and RM (?) (example on juggernaut app)

## plate math page
  - import and export file for plate rack and bar configs (?)
  - switch to toggle colors depending on plate weight (?)
  - get inspiration from the juggernaut app

## program page
  - exercise item page
    - add checkboxes to track how many sets were done(?)
    - header - add weight unit toggle for weight conversion(?)
  - setSelected next day workout on dateNow change (compare with atomsWithStorage lastDay?) (?)
  - oneRMs atom with storage object for semi persistent data that takes priority over the object in the json file for the percentage math(?)

## program management / program editor page
  - create 4th step on program editor (screen / modal options) (?)
    - another page or modal to display per week total volume of 1rm exercise
      - separate values for accessories and total
      - button - show screen for weekly (input amount of weeks(block)) volume / intensity
  - add warning on rm/week/exercise items delete attempt
  - share api - share json from other apps and import programs
  - if active program was edited and saved - set active again to reload program page? or does jotai handle this automatically?
  - replace `navigation.replace("ProgramEditorStack");` with navigation reset? and prevent android back button on program editing
  - keyboard avoiding view not pushing content up and glitching bottomTabBar every time it opens
  - copy and paste function? - similar to how whatsapp lets you forward a message to multiple chats, do this for exercise items in day section(?)
  - add spinner overlay on save

## PR Tracker page
  - lift/movement/exercise selector
  - display some fancy graphs/charts
  - show graph with x axis for the passage of time and the y axis for the weight lifted
  - percentage math for lastest entry of exercise below the graph (kinda like 1rm calculator page)

## program downloader page (?)
  - fetch from a git repo (?)

## settings page
  - about? - separate page for this (?)
    - app version
    - link to User Guide
    - "To report bugs, suggest new features, or if want to contribute to the project, access the link below"
    - link to GitHub Repository
    - "This app is ad free. If you feel like it, please support the developer"
    - link to buy me a coffee
    - Created by Wellington Junior
  - "Weights are rounded to 2.5kg and 5lbs so that it's easier on the head and load the bar mid training session, and it's applied in every screen. In the future, it will be added a toggle so that you can disable this behavior."
  - add switch to disable rounding and show actual weight after percentage calculation
  - update warning/modal info - `import { version } from './package.json';`
    - make a getto "api" with the barbellwhip website and check on load if version in a atom with storage is different from the version in the website
    - dont show again
    - download to temp?
    - settings check for update button

## misc
  - excel conversion to json? - spreadsheet template? (sort of done for a few programs)
  - web/desktop program view and editor
  - json program validator
  - notes input for days/exercises on the program page ? (where/how would I save/load this ?)
  - write documentation for the code, program .json schema, and how to use the app.
  - include a few programs loaded by default in programEditorPage (?)
    - phat
    - ph3
    - strengthV4
    - jamal deadlift
  - make text responsive everywhere (?)
    - `<Text adjustsFontSizeToFit style={styles(activeTheme).text}>teste</Text>`
  - think of a way to extend the program schema to allow for auto regulation logic with reps and weight 1rm estimation - like what happens in the PH3 spreadsheet

---

# BUGS

- program page glitch - test without useEffects?

- when program is active and there was an edit then set active -> week was set to 1 again. should remain where it was

- prevent screen rotation. some devices override (?)

- barbellwhip app bug on deleting last week in stepTwo, won't select last item after deletion (?)

- change program editor program data to atom with storage in both apps (?) to prevent from accidental discard of progress (kinda redundant if there's a warning on go back)

- on save program - check if file with the same name already exists

- check TODOs and unused variables

- weightRackPage Object. map's fucking up performance?

- remake week menu list without animations?

- optimize performance
  - check for rerenders
  - console.time
  - console.timeEnd

---

- https://tamagui.dev/
- try this and have only one codebase for web and native?

---

build release apk instead of debug
https://gist.github.com/wdiasjunior/26c7f0b701c9fd8c184c1ebd92a5d986
https://reactnative.dev/docs/signed-apk-android.html
https://instamobile.io/android-development/generate-react-native-release-build-android/
