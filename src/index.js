/* global $ */

const levels = require('./levelSetup.js')
const Game = require('./game.js')
const LevelSelect = require('./levelSelect.js')

// TDOD function with this and levelSelect.levelSetup ?
document.querySelectorAll('#level-content .level-button')
      .forEach(b => { b.style.display = 'none' })

let game = new Game(levels)
let levelSelect = new LevelSelect(game)
levelSelect.setup()

document.getElementById('start-level').addEventListener('click', function () {
  levelSelect.startLevel(game.currentLevelName())
})

document.getElementById('restart-level').addEventListener('click', function () {
  levelSelect.setupLevel(game.currentLevelIndex(), 'restart')
  levelSelect.startLevel(game.currentLevelName())
})

document.getElementById('next-level').addEventListener('click', function () {
  let comLv = window.sessionStorage.getItem('level-completed')
  if (!comLv || game.levelIndex(comLv) < game.currentLevelIndex()) {
    window.sessionStorage.setItem('level-completed', game.currentLevelName())
    levelSelect.setupLevelOption(game.currentLevelName())
  }
  levelSelect.setupLevel(game.currentLevelIndex() + 1)
})

function arrowkeys (event, direction, editing) {
  if (editing) {
    event.preventDefault()
    let d = (direction === 'up' || direction === 'left') ? 'back' : 'forward'
    levelSelect.changeInputText(d)
  } else if (game.isPlaying()) {
    event.preventDefault()
    game.moveCurrentPlayer(direction)
  }
}

document.addEventListener('keydown', function (event) {
  let inputBox = $('#previous-level-input')
  let editing = inputBox.is(':focus')
  switch (event.which) {
    case 13:
      if (editing) {
        event.preventDefault()
        levelSelect.clickSubmit()
        inputBox.blur()
      }
      break
    case 37:
      arrowkeys(event, 'left', editing)
      break
    case 38:
      arrowkeys(event, 'up', editing)
      break
    case 39:
      arrowkeys(event, 'right', editing)
      break
    case 40:
      arrowkeys(event, 'down', editing)
      break
    default:
      // Nothing
  }
})

levelSelect.setupLevel(game.currentLevelName())
