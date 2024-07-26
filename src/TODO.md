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
    - [ ] add checkboxes to track how many sets were done (?)
    - [ ] header - add weight unit toggle for quick weight conversion (?)
    - [ ] add estimated rpe weight (?) - add switch to turn it on and off
  - rm review page
    - [ ] oneRMs atom with storage object for semi persistent data that takes priority over the object in the json file for the percentage math (?)

## program management / program editor page
  - [-] share intent - share json from other apps and import programs
  - [ ] add warning on rm/week/exercise items delete attempt
  - [-] change program editor program data to atom with storage in both apps(?) to prevent accidental discard of progress (kinda redundant if there's a warning on go back)
  - [ ] replace `navigation.replace("ProgramEditorStack");` with navigation reset? and prevent android back button on program editor stack from exiting and losing progress
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
  - [ ] lift/movement/exercise selector
  - [ ] display some fancy graphs/charts
  - [ ] show graph with x axis for the passage of time and the y axis for the weight lifted
  - [ ] percentage math for lastest entry of exercise below the graph (kinda like 1rm calculator page)

## settings page
  - [ ] about? - separate page for this (?)
    - [ ] link to website
    - [ ] link to User Guide
    - [ ] "To report bugs, suggest new features, or if you want to contribute to the project, access the link below"
    - [ ] link to GitHub Repository
    - [ ] "This app is ad free. If you feel like it, please support the project"
    - [ ] link to buy me a coffee
  - [x] add switch to disable rounding and show actual weight after percentage calculation
    - [x] add checkboxes to select rm formulas to be used
    - [x] "Weights are rounded to 2.5kg and 5lbs"

## misc
  - [ ] switch to SQLite and stop using file system directly (?)
  - [ ] excel conversion to json? - spreadsheet template? (sort of done for a few programs)
  - [ ] json program validator on import (?)
  - [ ] notes input for days/exercises on the program page ? (where/how would I save/load this ?)
  - [ ] write documentation for the code, program .json schema, and how to use the app.
  - [ ] think of a way to extend the program schema to allow for auto regulation logic with reps and weight, 1rm estimation - like what happens in the PH3 spreadsheet

---

# BUGS

- [ ] program page glitch on first load - remake week menu list without animations?

- program editor page
  - [x] light theme borders not showing on text inputs
  - [ ] when saving and importing training programs
    - [ ] check if file with the same name already exists
    - [ ] add as a duplicate
  - [ ] FS bug
    - [ ] on copy then rename wont change file name. instead creates a different file
    - [ ] use current behavior for save as copy button

---

# TODO priority

- [ ] change program editor program data prevent accidental discard
  - [ ] change to atom with storage in both apps?
  - [ ] save data to file in a temp folder and ask to resume progress
  - [ ] auto save program editor
- [x] change tempo for cadencia in ptbr
- [-] use display flex instead of a bunch of rows on exercise page
- [-] add weight input to simple exercise and hide percentage/weight calc row
- [-] astro fuwari theme
- [x] switch to toggle colors on or off depending on plate weight (?)
- [x] move bumper button to settings page? (defaults to off)
