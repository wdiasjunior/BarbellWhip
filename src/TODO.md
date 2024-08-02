# TODO

- [ ] change splash screen based on the selected theme (?)

## calculator page
  - [ ] add settings screen (?)
    - [ ] kg - lbs switch
    - [x] checkboxes to choose which formulas to calculate 1rm from
  - [ ] implement rpe calculator (?)
    - [ ] add rpe math block
    - https://www.rpecalculator.com/
    - https://articles.reactivetrainingsystems.com/2015/11/29/beginning-rts/
    - [ ] get inspiration from the juggernaut app
  - [ ] calculator tab screen - add topTabBar to switch between RPE and RM (?) (example on juggernaut app)

## plate math page
  - [ ] import and export file for plate rack and bar configs (?)
  - [x] switch to toggle colors depending on plate weight
  - [ ] get inspiration from the juggernaut app

## program page
  - exercise item page
    - [-] use flex wrap instead of a bunch of rows (?)
    - [ ] add checkboxes to track how many sets were done (?)
    - [ ] header - add weight unit toggle for quick weight conversion (?)
    - [ ] add estimated rpe weight (?) - add switch to turn it on and off

## program editor page
  - [x] share intent - share json from other apps and import programs
  - [ ] add warning on rm/week/exercise items delete attempt
  - [x] change program editor program data to atom with storage in both apps(?) to prevent accidental discard of progress (kinda redundant if there's a warning on go back)
  - [ ] add spinner overlay on save
  - *StepOne*
    - [ ] 1rm input group. add field for reps and math for estimated rm depending on the amount of reps
  - *StepThree*
    - [ ] copy and paste function? - similar to how whatsapp lets you forward a message to multiple chats, do this for exercise items in day section (?)
  - *StepFour* (?)
    - [ ] create 4th step on program editor (screen / modal options) (?)
    - [ ] another page or modal to display per week total volume of 1rm exercise
      - [ ] separate values for accessories and total
      - [ ] button - show screen for weekly (input amount of weeks(block)) volume / intensity

## PR Tracker page
  - [ ] integrate OpenBarbell data (?)
  - [ ] lift/movement/exercise selector
  - [ ] display some fancy graphs/charts

## settings page
  - [x] add switch to disable rounding and show actual weight after percentage calculation
    - [x] add checkboxes to select rm formulas to be used
    - [x] "Weights are rounded to 2.5kg and 5lbs"

## misc
  - [ ] switch to SQLite and stop using file system directly (?)
  - [ ] excel conversion to json? - spreadsheet template? (sort of done for a few programs)
  - [-] json program validator on import (?)
  - [ ] notes input for days/exercises on the program page ? (where/how would I save/load this ?)
  - [ ] write documentation for the code, program .json schema, and how to use the app.
  - [ ] think of a way to extend the program schema to allow for auto regulation logic with reps and weight, 1rm estimation - like what happens in the PH3 spreadsheet

---

# BUGS

- program page
  - [ ] "content shift" glitch on first load

- program editor page
  - [x] light theme borders not showing on text inputs
  - [x] when saving and importing training programs
    - [x] check if file with the same name already exists
    - [x] add as a duplicate
  - [x] FS bug
    - [x] on copy then rename wont change file name. instead creates a different file

- [ ] File system alerts using hard coded messages

---

# TODO priority

- [x] change program editor program data to prevent accidental discard
  - [x] change to atom with storage
- [x] change tempo for cadencia in ptbr

- [x] add weight input to simple exercise and hide percentage/weight calc row
- [x] switch to toggle colors on or off depending on plate weight (?)
- [x] move bumper button to settings page? (defaults to off)
