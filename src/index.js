const levels = require('./levelSetup.js')
const EventHandlers = require('./eventHandlers.js')

let eventHandlers = new EventHandlers(levels)
eventHandlers.setup()

eventHandlers.levelKeys().forEach(function (key, i) {
  let option = document.createElement('OPTION')
  option.value = key
  option.innerHTML = key
  let select = document.getElementById('level-select')
  if (i === 0) select.value = key
  select.appendChild(option)
})

eventHandlers.selectLevel(eventHandlers.currentLevel)
