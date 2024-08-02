# TODO

- [ ] change splash screen based on the selected theme (?)

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

## misc
  - [ ] switch to SQLite and stop using file system directly (?)
  - [ ] excel conversion to json? - spreadsheet template? (sort of done for a few programs)
  - [ ] json program validator on import
  - [ ] notes input for days/exercises on the program page ? (where/how would I save/load this ?)
  - [ ] write documentation for the code, program .json schema, and how to use the app.
  - [ ] think of a way to extend the program schema to allow for auto regulation logic with reps and weight, 1rm estimation - like what happens in the PH3 spreadsheet

---

# BUGS

- [ ] program page - "content shift" glitch on first load
- [ ] File system alerts using hard coded messages

---
