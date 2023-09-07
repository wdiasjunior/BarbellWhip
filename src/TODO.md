# TODO
# review last commit changes, finish the TODOs and test the app

- jotai - change this `const [, setValue] = useAtom(valueAtom)` to useSetAtom to increase performance
  - https://jotai.org/docs/api/core#use-set-atom

- add logo to splash screen and app icon
- reduce splash screen time
- double check // TODO comments

# calculator page
  - unify calculator page and program page math
  - kg - lbs switch
  - add settings screen?
    - checkboxes to choose which formulas to calculate 1rm from ?
  - implement rpe calculator ? https://www.rpecalculator.com/ (?)
  - add features from juggernaut
  - calculator tab screen - add topTabBar to switch between RPE and RM? (example on juggernaut app)

# plate math page
  - import and export file for plate rack and bar configs?
  - switch to set color depending on plate weight?
  - get inspiration from juggernaut

# program page
  - exercise item page
    - add checkboxes to indicate how many sets were done ?
    - header - add weight unit toggle for weight conversion math ?
  - setSelected next day workout on dateNow change (compare with atomsWithStorage lastDay?) ?
  - oneRMs atom with storage object for semi persistent data that temporarily overrides the object in the json file?

# program management / program editor page
  - "create program" header should have dynamic title - create and edit depending on the action (add to locales)
  - 4th step - program editor (screen / modal options) ??
    - another page ? or modal ? show per week total volume of 1rm exercise separate values for accessories and total
      - button - show screen for weekly (input amount of weeks) volume / intensity
  - add warning on rm/week/exercise items delete attempt
  - don't save empty days in the json? or just don't render empty days on program page?
  - prevent saving empty exercise
  - share api - share json from other apps and import programs
  - if active program was edited and saved - set active again to reload program page? or does jotai handle this automatically?
  - replace `navigation.replace("ProgramEditorStack");` with navigation reset? and prevent android back button on program editing
  - keyboard avoiding view not pushing content up and glitching bottomTabBar every time it opens
  - copy and paste function? - similar to how whatsapp lets you forward a message to multiple chats, do this for exercise items in day section?
  - add spinner overlay on save

# PR Tracker page
  - lift/movement/exercise selector
  - display some fancy graphs/charts
  - show graph with x axis for the passage of time and the y axis for the weight lifted
  - percentage math for lastest entry of exercise below the graph (kinda like 1rm calculator page)

# program downloader page (?)
  - fetch from a git repo (?)

# settings page
  - about? - separate page for this?
    - app version
  - "Weights are rounded to 2.5kg and 5lbs so that it's easier on the head and load the bar mid training session, and it's applied in every screen. In the future, it will be added a toggle so that you can disable this behavior."
  - add switch to disable rounding and show actual weight after percentage calculation

# misc
- excel conversion to json? - spreadsheet template? (sort of done for a few programs)
- web/desktop program view and editor
- json checker
- notes input for days/exercises on the program page ? (where/how would I save this ?)
- write documentation for the code, program .json schema, and how to use the app.
- include a few programs loaded by default in programEditorPage
  - phat
  - ph3
  - strengthV4
  - jamal deadlift
- make text responsive everywhere?
  - `<Text adjustsFontSizeToFit style={styles(activeTheme).text}>teste</Text>`

---


//   old About Page from the first app prototype from a few years ago
//
//   <div id="container">
//   <strong>By powerlifters, to powerlifters.</strong><br><br>
//
//   {/*<Text style={styles(activeTheme).subtitle}>User Guide (link)</Text>*/}
//
//   <p>To report bugs, suggest new features</p>
//   <p>or if want to contribute to the project</p>
//   <p>access the link below.</p><br>
//   <p><a style="color: #3dc2ff;" href="https://github.com/" target="_blank">GitHub Repository</a></p><br>
//
//   <p>This app is ad free.<br>If you feel like it, please support the developer.</p><br>
//   <p><a style="color: #3dc2ff;" href="https://paypal.com/" target="_blank">Donate</a></p><br><br><br>
//   <p style="color: #ffffff">Created by Wellington Junior.</p>
//   </div>
//
//   {/*<Text style={styles(activeTheme).subtitle}>Version Number</Text>*/}


program page glitch - test without useeffects?

when program is active and there was an edit then set active -> week was set to 1 again

prevent screen rotation

barbellwhip app bug on deleting last week in stepTwo, won't select last item after deletion

change program editor program data to atom with storage in both apps? prevent accidental discard of progress

on save program check if file with the same bame already exists
prevent adding empty days (rest days) and empty exercises to the saved file?
does program page have a rest day info text?

update warning/modal info
import { version } from './package.json';

fix other bugs

barbellwhip

release current features and bug fixes
worry about performance later?

check todos and unused variables/find in objects
check for rerenders
weightRackPage Object. map's fucking up performance?
remake week menu list without animations?

console.time
console.timeEnd

react native native module rust parser
look up takuya dev as a life c++ encryption module for inspo?

app update notifications?
make a getto "api" with the barbellwhip website and check on load if version in a atom with storage is different from the version in the website
dont show again
download to temp?
settings check for update button

ios? web?

mongodb react native performance vs big json files
realm.io sdk
https://github.com/mrousavy/react-native-mmkv

ci cd build bot?

---

prototype barbellwhip logic with pseudo code?

per exercise set entry notes

and think of a way to extend the schema to allow for auto regulation logic with reps and weight 1rm estimation

---

https://tamagui.dev/
try this on barbellwhip and have only one codebase?

---

build release apk instead of debug
https://gist.github.com/wdiasjunior/26c7f0b701c9fd8c184c1ebd92a5d986
https://reactnative.dev/docs/signed-apk-android.html
https://instamobile.io/android-development/generate-react-native-release-build-android/
