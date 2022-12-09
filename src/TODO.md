- choose a license - gpl vs mpl

- make text responsive? - beta
  - // <Text adjustsFontSizeToFit style={styles(activeTheme).text}>teste</Text>

- calculator page
  - kg - lbs switch - beta
  - settings not working
  - implement rpe calculator ? https://www.rpecalculator.com/ ?
  - add features from juggernaut
  - calculator tab screen - add topTabBar to switch between RPE and RM? (example on juggernaut app)
  - refactor calculator weightcalc items into a .map ?

- plate math page
  - persistence
  - settings not working - bottom drawer / modal / page ?
  - add weight rack and custom bars
  - kg - lbs switch
  - fix warning about weights that are not round or don't finish with 0 or 5
  - get inspiration from juggernaut
  - set color depending on plate weight?

- program page
  - exercise item page
    - add checkboxes to indicate how many sets were done ? - beta
    - header - add weight unit toggle for weight conversion math ?
  - setSelected next day workout on dateNow change (compare with atomsWithStorage lastDay?) ? - beta

- program management / program editor page
  - 4th step - program editor (screen / modal options) ??
    - another page ? or modal ? show per week total volume of 1rm exercise separate values for accessories and total
      - button - show screen for weekly (input amount of weeks) volume / intensity
  - add warning on rm/week/exercise delete attempt - beta
  - rounding math for pounds in program page and program editor page
    // Math.ceil((parseFloat(onermOBJ?.weight) * (parseFloat(item.percentage) / 2.5)) * 2.5 // kg round to 2.5
    // Math.ceil((parseFloat(onermOBJ?.weight) * (parseFloat(item.percentage) / 5)) * 5 // lbs round to 5
    // =IF($D$2=0,ROUND(E14*$C$8/2500,3)*2500,ROUND(E14*$C$8/5000,3)*5000)
  - don't save empty days in the json? or just don't render empty days on program page?
  - prevent saving empty exercise
  - share api - share json from other app and import program into program editor page
  - if active program was edited and saved - set active again to reload program page? or does jotai handle this automatically?
  - replace navigation.replace("ProgramEditorStack"); with navigation reset? and prevent android back button
  - keyboard avoiding view not pushing content up and glitching bottomTabBar every time it opens - beta
  - react native file system - create directory for programs?

- include a few programs loaded by default in the app - beta
  - phat
  - ph3
  - strengthVx
  - jamal deadlift

- settings page - beta
  - language switch - add multi language support (put translations with variables on a json file?)
    - save preferred language into atomsWithStorage - beta
  - about? - separate page for this?
  - Weights are rounded to 2.5kg so that it's easier on the head mid training session, and it's applied in every screen. In the future, it will be added a toggle so that you can disable this behavior.

- create PR Tracker page (display some fancy graphs/charts)
--------------------------------------------------------------------------------------

- theme list
  - bulma.io accent colors?
  - colorSchemeIdeas.scss
  - atom one dark

--------------------------------------------------------------------------------------
- excel conversion to json? - spreadsheet template?
-
--------------------------------------------------------------------------------------

- notes for days/exercises on the program page ? (where/how would I save this ?)
- create some kind of community hub / github repo with programs and make a page to download from there ?
- checkboxes to choose which formulas to calculate 1rm from ?

- - - readme - - -
from simple bodybuilding and calisthenics workouts to complex powerlifting and
weightlifting programs with RM calculation based on percentage (and rpe? future feature), and
tools such as a program editor, RM and weight plate calculators,
and (hopefully) more in the future.

--------------------------------------------------------------------------------------

- write documentation for the code, program .json schema, and how to use the app.
