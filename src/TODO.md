- jotai - change this `const [, setValue] = useAtom(valueAtom)` to useSetAtom to increase performance
  - https://jotai.org/docs/api/core#use-set-atom

- reduce splash screen time

- make text responsive?
  - `<Text adjustsFontSizeToFit style={styles(activeTheme).text}>teste</Text>`

# calculator page
  - unify calculator page and program page math
  - kg - lbs switch
  - settings not working
  - implement rpe calculator ? https://www.rpecalculator.com/ (?)
  - add features from juggernaut
  - calculator tab screen - add topTabBar to switch between RPE and RM? (example on juggernaut app)

# plate math page
  - persistence
    - import and export file for plate rack and bar configs?
  - settings page
    - weight rack and custom bars weight input
    - change weight unit
    - kg - lbs switch
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
  - "create program" header show have dynamic title - create and edit depending on the action (add to locales)
  - 4th step - program editor (screen / modal options) ??
    - another page ? or modal ? show per week total volume of 1rm exercise separate values for accessories and total
      - button - show screen for weekly (input amount of weeks) volume / intensity
  - add warning on rm/week/exercise delete attempt
  - rounding math for pounds in program page and program editor page
    - `Math.ceil((parseFloat(onermOBJ?.weight) * (parseFloat(item.percentage) / 2.5)) * 2.5 // kg round to 2.5`
    - `Math.ceil((parseFloat(onermOBJ?.weight) * (parseFloat(item.percentage) / 5)) * 5 // lbs round to 5`
    - `=IF($D$2=0,ROUND(E14*$C$8/2500,3)*2500,ROUND(E14*$C$8/5000,3)*5000)`
  - don't save empty days in the json? or just don't render empty days on program page?
  - prevent saving empty exercise
  - share api - share json from other app and import program into program editor page
  - if active program was edited and saved - set active again to reload program page? or does jotai handle this automatically?
  - replace navigation.replace("ProgramEditorStack"); with navigation reset? and prevent android back button
  - keyboard avoiding view not pushing content up and glitching bottomTabBar every time it opens
  - react native file system - create directory for programs?
  - copy and paste function? - similar to how whatsapp lets you forward a message to multiple chats, do this for days?
  - add spinner on save

# PR tracker page
  - lift selector
  - show graph with x axis for the passage of time and the y axis for the weight lifted
  - percentage math for lastest entry of exercise below the graph

# program downloader page (?)
  - fetch from a git repo (?)

# settings page
  - about? - separate page for this?
  - "Weights are rounded to 2.5kg so that it's easier on the head mid training session, and it's applied in every screen. In the future, it will be added a toggle so that you can disable this behavior."
  - add switch for absolute percentage instead of rounding

# PR Tracker page
  - display some fancy graphs/charts

# misc
- excel conversion to json? - spreadsheet template?
- web/desktop program view and editor (and json checker?)
- notes for days/exercises on the program page ? (where/how would I save this ?)
- create some kind of community hub / github repo with programs and make a page to download from there ?
- checkboxes to choose which formulas to calculate 1rm from ?
- write documentation for the code, program .json schema, and how to use the app.
- include a few programs loaded by default in programEditorPage
  - phat
  - ph3
  - strengthVx
  - jamal deadlift
