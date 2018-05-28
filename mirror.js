function showError (err) {
  const app = Application.currentApplication()
  app.includeStandardAdditions = true
  app.displayAlert(err.toString())
}

let checker = 0

function getDisplaysPane (prefApp) {
  const displays = prefApp.panes.byId('com.apple.preference.displays')
  displays.reveal()
  delay(0.3)
  return displays
}

function getPrefWindows (prefName) {
  return new Application('System Events').processes[prefName].windows()
}

function mirror (displays, prefApp, prefWindows) {
  try {
    displays.anchors.byName('displaysArrangementTab').reveal()
  } catch (err) {
    showError(err, 'Cannot find Arrangement')
    return
  }

  // let ele =  prefWindows.windows.byName("Built-in Retina Display").tabGroups.at(0).groups.at(0).sliders.at(0)
  // prettyLog(ele)



  prefWindows
    .map(w => w.tabGroups[0])
    .filter(t => t.checkboxes.length > 0)
    .forEach(t => {

      checker = t.checkboxes[0].value()
      t.checkboxes[0].click()
      console.log("checker", checker)
    })

  // prefWindows
  //   .map(w => w.tabGroups[0])
  //   .filter(t => t && t.checkboxes && t.checkboxes.length == 0)
  //   .map(t => t.groups[0])
  //   .map(t => t.sliders[0])
  //   .map(t => {
  //     let oriValue = t.value()
  //     if (checker == 0) {
  //       t.value = 0
  //     } else {
  //       t.value = 0.5
  //     }
  //     console.log('orivalue',oriValue)

  //     // prettyLog(t)
  //   })

  // .forEach(t => t.checkboxes[0].click());
}

function dark (displays, prefApp, prefWindows) {
  try {
    displays.anchors.byName('displaysArrangementTab').reveal()
  } catch (err) {
    showError(err, 'Cannot find Arrangement')
    return
  }

  // let ele =  prefWindows.windows.byName("Built-in Retina Display").tabGroups.at(0).groups.at(0).sliders.at(0)
  // prettyLog(ele)



  // prefWindows
  //   .map(w => w.tabGroups[0])
  //   .filter(t => t.checkboxes.length > 0)
  //   .forEach(t => {

  //     checker = t.checkboxes[0].value()
  //     t.checkboxes[0].click()
  //     console.log("checker", checker)
  //   })

  prefWindows
    .map(w => w.tabGroups[0])
    .filter(t => t && t.checkboxes && t.checkboxes.length == 0)
    .map(t => t.groups[0])
    .map(t => t.sliders[0])
    .map(t => {
      let oriValue = t.value()
      console.log(checker)
      if (checker == 0) {
        t.value = 0
      } else {
        t.value = 0.5
      }
      console.log('orivalue',oriValue)

      // prettyLog(t)
    })

  // .forEach(t => t.checkboxes[0].click());
}
function prettyLog (object) {
  console.log(Automation.getDisplayString(object))
}


function getAndRunMirror() {
  const prefName = 'System Preferences'
  const prefApp = new Application(prefName)
  const displays = getDisplaysPane(prefApp)
  const prefWindows = getPrefWindows(prefName)
  if (prefWindows.length > 1) {
    mirror(displays, prefApp, prefWindows)
  } else {
    showError('Need more displays', '')
  }
  prefApp.quit()
  delay(0.3)
  getAndRunDark()
}
function getAndRunDark() {
  const prefName = 'System Preferences'
  const prefApp = new Application(prefName)
  const displays = getDisplaysPane(prefApp)
  const prefWindows = getPrefWindows(prefName)
  if (prefWindows.length > 1) {
    dark(displays, prefApp, prefWindows)
  } else {
    showError('Need more displays', '')
  }
  prefApp.quit()
}

function run (argv) {
  getAndRunMirror()

}
