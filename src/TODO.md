# TODO

## general
  - [ ] change splash screen background color based on the selected theme (?)
  - [ ] change icon in splash screen for a svg? transparent background?


## calculator page
  - [ ] implement rpe calculator (?)
    - [ ] add rpe math block
    - https://www.rpecalculator.com/
    - https://articles.reactivetrainingsystems.com/2015/11/29/beginning-rts/
    - [ ] get inspiration from the juggernaut app
  - [ ] calculator tab layout - add topTabBar to switch between RPE and RM (?) (example on juggernaut app)


## plate math page
  - [ ] import and export file for plate rack and bar configs (?)
  - [ ] get inspiration from the juggernaut app


## program page
  - exercise item page
    - [-] use flex wrap instead of a bunch of rows
    - [ ] add checkboxes to track how many sets were done (?) (value is only persisted while the exercise screen is open/active?)
    - [ ] header - add weight unit toggle for quick weight conversion (?)
    - [ ] add estimated rpe weight (?) - add switch to turn it on and off


## program editor page
  - [ ] add warning on rm/week/exercise items delete attempt
  - [ ] add spinner/loading overlay on save
  - *StepOne*
    - [ ] 1rm input group. add field for reps and math for estimated rm depending on the amount of reps, instead of a set weight?
  - *StepThree*
    - [ ] copy and paste function? - similar to how whatsapp lets you forward a message to multiple chats, do this for exercise items in day section (?)
      - [ ] move/copy and paste exercise to day x in the same week
  - *StepFour* (?)
    - [ ] create 4th step on program editor (screen / modal with options) (?)
    - [ ] another page or modal to display per week total volume of 1RM exercise
      - [ ] separate values for accessories and total volumes
      - [ ] button - show screen for weekly (input amount of weeks(block)) volume / intensity


## PR Tracker / OpenBarbell page
  - [ ] port code from openbarbell app
  - [ ] integrate OpenBarbell device data via bluetooth
  - [ ] lift/movement/exercise selector tabs
  - [ ] display some fancy graphs/charts
  - [ ] google drive/spreadsheet integration?


## settings page


## misc
  - [ ] ditch barbellwhip-web and try and get react native compiled for the web
  - [ ] switch to SQLite and stop using file system directly (op-sqlite?)
  - [ ] excel conversion to json? - spreadsheet template? (sort of done for a few programs) (AI powered?)
  - [ ] json program validator on import
  - [ ] notes input for days/exercises on the program page ? (where/how would I save/load this ?)
  - [ ] write documentation for the code, program .json schema, and how to use the app. add a docs section to the website
  - [ ] think of a way to extend the program schema to allow for auto regulation logic with reps and weight, 1rm estimation and VBT - like what happens in the PH3 spreadsheet


---

# BUGS / RN Version Upgrade Bugs

**update notes. for users on older versions, back up your programs via the export button, clean the app data and cache then update the app, as there are some issues and incompatibilities found after some of the app dependencies got upgraded**

- [ ] test the whole thing and check for new bugs/weird issues

- [-] programpage - "content shift" glitch on cold boot launch load
- [x] programpage displays default program data on cold boot launch load

- [x] fix navigation stack weird go back behavior

- [x] File system alerts using hard coded messages
in some places of the code I'm using standard alerts for File system operations and I'm using hard coded messages. replace them with locales

- [x] remove "weight" label and move weight value next to exercise name

- [x] ivestigate a possible bug - clicking the import button deletes data from editor (unconfirmed). if the user was previously editing/creating a program and it was cached/not saved, then clicked the import button (not sure if selecting a file would make a difference) deleted the program editor atom data

- [x] locale and ui theme not being restored after loading
- [x] useInitialRender causing some errors in debug but not crashing the app
  - [x] check for old UI glitch/shift on load

- [x] programeditor stepOne and exerciseEditorPage on keyboard open, content stays hidden under the keyboard, instead of getting pushed up to become visible on my phone, but on android emulator it behaves correctly
  - [x] check screenshot?

- [x] when editing and saving a program, the navigation stack adds another ProgramEditorPage, requiring another os back button click to go back
I want you to revise the entire navigation stack for the app
I'm seeing some weird behavior. when editing and saving a program, the the navigation stack adds another ProgramEditorPage, requiring another operating system back button click to actually go back.
*now when saving a program I used to have a navigation.replace("ProgramEditorStack"); instead of navigation.goBack();, but since the change instead of going back to the ProgramEditorPage, it goes back to an empty stepOne.*
  - [x] check screenshot?

- [x] the very first time the app is started without user data the theme defaults to light despite the option being marked as dark in the settings page and the atoms having the dark option set as fallback

- [x] the keyboard avoing view previously added to stepone and exerciseEditorPage doesn't work. it's also necessary to add it to weightRackPage

- [x] remove navigation go back animation/fade on program editor stack and weightrack stack. also on calculator page stack when the new page is created?

- [x] add settings screen (?)
  - [x] add "kg - lbs" switch
  - [x] move formula selector to new screen

---

# commit message

feat: openbarbell app port and integration

---

ultrathink

I want to port the original openbarbell app functionality to my app barbellwhip, into the openbarbell page directory.

in the src/pages/openbarbell/legacy-openbarbell sub directory you will find the original app's source code that I want to integrate, however it is old and uses class components, so you should convert them into function and hook based components into a components directory separate from the legacy code, leaving it untouched.

make sure to install the necessary up to date bluetooth management package, refer to the legacy-openbarbell package.json.

openBarbellPage.tsx should be the main screen with a button to search for available bluetooth devices matching the device IDs, and a way to connect to the device.

a screen to start a workout, like in the workout tab for the original app, except no camera option should be implemented yet, just leave a TODO comment there.

I'm not sure how the original openbarbell app works for the user, but I want to keep track of the data received from the device in json files, separate for each exercise that the user can select from.

create a sub screen-stack in the openbarbellpage to review each exercise in a tab layout screen using the sharedcomponents/toptabbar, displaying a graph at the top and a list of reps/sets beneath it.

add locale keys and jotai atoms as seem fit.

---
