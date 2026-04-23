# TODO

## general
  - [ ] change splash screen background color based on the selected theme (?)
  - [ ] change icon in splash screen for a svg? transparent background?

## calculator page
  - [ ] add settings screen (?)
    - [ ] kg - lbs switch
  - [ ] implement rpe calculator (?)
    - [ ] add rpe math block
    - https://www.rpecalculator.com/
    - https://articles.reactivetrainingsystems.com/2015/11/29/beginning-rts/
    - [ ] get inspiration from the juggernaut app
  - [ ] calculator tab screen - add topTabBar to switch between RPE and RM (?) (example on juggernaut app)

## plate math page
  - [ ] import and export file for plate rack and bar configs (?)
  - [ ] get inspiration from the juggernaut app

## program page
  - exercise item page
    - [-] use flex wrap instead of a bunch of rows (?)
    - [ ] add checkboxes to track how many sets were done (?)
    - [ ] header - add weight unit toggle for quick weight conversion (?)
    - [ ] add estimated rpe weight (?) - add switch to turn it on and off

## program editor page
  - [ ] add warning on rm/week/exercise items delete attempt
  - [ ] add spinner overlay on save
  - *StepOne*
    - [ ] 1rm input group. add field for reps and math for estimated rm depending on the amount of reps
  - *StepThree*
    - [ ] copy and paste function? - similar to how whatsapp lets you forward a message to multiple chats, do this for exercise items in day section (?)
      - [ ] move/copy and paste exercise to day x in the same week
  - *StepFour* (?)
    - [ ] create 4th step on program editor (screen / modal options) (?)
    - [ ] another page or modal to display per week total volume of 1rm exercise
      - [ ] separate values for accessories and total
      - [ ] button - show screen for weekly (input amount of weeks(block)) volume / intensity

## PR Tracker / OpenBarbell page
  - [ ] port code from openbarbell app
  - [ ] integrate OpenBarbell device data via bluetooth
  - [ ] lift/movement/exercise selector tabs
  - [ ] display some fancy graphs/charts
  - [ ] google drive/spreadsheet integration?

## settings page

## misc
  - [ ] fix navigation stack weird go back behavior
  - [ ] ditch barbellwhip-web and try and get react native compiled for the web
  - [ ] switch to SQLite and stop using file system directly (op-sqlite?)
  - [ ] excel conversion to json? - spreadsheet template? (sort of done for a few programs) (AI powered?)
  - [ ] json program validator on import
  - [ ] notes input for days/exercises on the program page ? (where/how would I save/load this ?)
  - [ ] write documentation for the code, program .json schema, and how to use the app. add a docs section to the website
  - [ ] think of a way to extend the program schema to allow for auto regulation logic with reps and weight, 1rm estimation and VBT - like what happens in the PH3 spreadsheet

---

# BUGS

- [ ] program page - "content shift" glitch on first load
- [ ] File system alerts using hard coded messages
- [ ] clicking import button deletes data from editor (unconfirmed)

---

# RN Version Upgrade Bugs

- [-] useInitialRender causing some errors in debug but not crashing the app
  - [ ] check for old UI glitch/shift on load
- [ ] test the whole thing and check for new bugs/weird issues

---
