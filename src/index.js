/* global $ */

const levels = require('./levelSetup.js')
const Board = require('./board.js')
const Game = require('./game.js')

let closed = true
let board = new Board()
let game = new Game(levels, board)

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

$(document).on('change', 'select', function () {
  setSelect(this.value)
})
document.getElementById('restart-level').addEventListener('click', function () {
  game.selectLevel(game.currentLevel())
})
document.getElementById('next-level').addEventListener('click', function () {
  setSelect(game.currentLevelName())
  updateSelectText('#level-select')
  game.selectLevel(game.currentLevel() + 1)
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
// TODO disable dragon moving while editing input field
document.addEventListener('keydown', function (event) {
  event.preventDefault()
  let inputBox = $('#previous-level-input')
  let editing = inputBox.is(':focus')
  switch (event.which) {
    case 13:
      if (!closed) inputClick(inputBox)
      let newText = inputBox.val()
      if (game.levelIndex(newText) >= 0) setSelect(newText)
      document.getElementById('level-select-button').click()
      inputBox.blur()
      break
    case 37:
      if (editing) {
        changeInputText('back')
      } else if (board.isPlaying()) {
        board.moveCurrentPlayer('left')
      }
      break
    case 38:
      if (editing) {
        changeInputText('back')
      } else if (board.isPlaying()) {
        board.moveCurrentPlayer('up')
      }
      break
    case 39:
      if (editing) {
        changeInputText('forward')
      } else if (board.isPlaying()) {
        board.moveCurrentPlayer('right')
      }
      break
    case 40:
      if (editing) {
        changeInputText('forward')
      } else if (board.isPlaying()) {
        board.moveCurrentPlayer('down')
      }
      break
    default:
      // Nothing
  }
})

game.selectLevel(game.currentLevel())
