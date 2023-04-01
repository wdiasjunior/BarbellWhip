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
  - change weight unit
  - kg - lbs switch (does not change anything yet)
  - switch to set color depending on plate weight?
  - fix warning about weights that are not round or don't finish with 0 or 5
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
  - replace navigation.replace("ProgramEditorStack"); with navigation reset? and prevent android back button on program editing
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
- create some kind of community hub / github repo with programs and make a page to download from there ?
- write documentation for the code, program .json schema, and how to use the app.
- include a few programs loaded by default in programEditorPage
  - phat
  - ph3
  - strengthVx
  - jamal deadlift
- make text responsive everywhere?
  - `<Text adjustsFontSizeToFit style={styles(activeTheme).text}>teste</Text>`


# add contributing guidelines
- auto formmating/prettier/eslint settings? I don't even use this shit
  - please don't go using prettier and breaking all of the formmating around the code base
  - if a line needs to be long leave it long
  -
- 2 space tabs
- double quotes for strings
- single quotes for chars
- don't be afraid of big files, no need to split a component in 15 different files and directories, have some common sense
-
- and last but more importantly: make use of goHorse whenever necessary
