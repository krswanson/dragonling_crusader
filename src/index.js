/* global $ */

const levels = require('./levelSetup.js')
const Game = require('./game.js')

let closed = true
let game = new Game(levels)

game.levelKeys().forEach(function (key, i) {
  let option = document.createElement('OPTION')
  option.value = key
  option.innerHTML = key
  let select = document.getElementById('level-select')
  if (i === 0) select.value = key
  select.appendChild(option)
})

function inputClick (input) {
  closed = !closed
  $(input).closest('div').find('select').slideToggle(110)
}

function updateSelectText (element) {
  $(element).hide().closest('div').find('input').val($(element).find('option:selected').text())
}

function changeInputText (direction) {
  let oldText = $('#level-select').find('option:selected').val()
  let newIndex = game.levelIndex(oldText) + (direction === 'back' ? -1 : 1)
  let key = oldText ? newIndex : 0
  if (key < 0) key = 0
  if (key >= game.numLevels()) key = game.numLevels() - 1
  let newText = game.levelName(key)
  setSelect(newText)
  $('#previous-level-input').val(newText)
}

function setSelect (levelKey) {
  $('#level-select')[0].value = levelKey
  $('option[value="' + levelKey + '"]', document)
  .attr('selected', true).siblings()
  .removeAttr('selected')
}

function arrowkeys (event, direction, editing) {
  if (editing) {
    event.preventDefault()
    let d = (direction === 'up' || direction === 'left') ? 'back' : 'forward'
    changeInputText(d)
  } else if (game.isPlaying()) {
    event.preventDefault()
    game.moveCurrentPlayer(direction)
  }
}

$(document).on('change', 'select', function () {
  setSelect(this.value)
  closed = !closed
})
document.getElementById('restart-level').addEventListener('click', function () {
  game.selectLevel(game.currentLevelName())
})
document.getElementById('next-level').addEventListener('click', function () {
  setSelect(game.currentLevelName())
  updateSelectText('#level-select')
  game.selectLevel(game.currentLevelIndex() + 1)
})
document.getElementById('level-select').addEventListener('click', function () {
  updateSelectText(this)
})
document.getElementById('level-select-button').addEventListener('click', function () {
  let input = $('#previous-level-input')[0].value || $('#level-select')[0].value
  if (game.validLevel(input)) {
    game.selectLevel(input)
    if (!closed) inputClick('#previous-level-input')
  } else {
    $('#previous-level-input').val('')
    // TOTDO error message
  }
})

let prevLevelInput = document.getElementById('previous-level-input')
prevLevelInput.addEventListener('click', function () {
  inputClick(this)
})

document.addEventListener('keydown', function (event) {
  let inputBox = $('#previous-level-input')
  let editing = inputBox.is(':focus')
  switch (event.which) {
    case 13:
      if (editing) {
        event.preventDefault()
        if (!closed) inputClick(inputBox)
        let newText = inputBox.val()
        if (game.levelIndex(newText) >= 0) setSelect(newText)
        document.getElementById('level-select-button').click()
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

game.selectLevel(game.currentLevelName())
