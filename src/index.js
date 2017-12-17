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
  if (game.validLevel(input)) game.selectLevel(input)
  else {
    $('#previous-level-input').val('')
    // TOTDO error message
  }
})

let prevLevelInput = document.getElementById('previous-level-input')
prevLevelInput.addEventListener('click', function () {
  inputClick(this)
})
// TODO disable dragon moving while editing input field
prevLevelInput.addEventListener('keyup', function (event) {
  event.preventDefault()
  let oldText = $('#level-select').find('option:selected').val()
  let key = null
  let newText = null
  switch (event.which) {
    case 13:
      if (!closed) inputClick(this)
      let inputBox = $('#previous-level-input')
      newText = inputBox.val()
      if (game.levelIndex(newText) >= 0) setSelect(newText)
      document.getElementById('level-select-button').click()
      inputBox.blur()
      break
    case 37:
    case 38:
      key = oldText ? game.levelIndex(oldText) - 1 : 0
      if (key < 0) key = 0
      newText = game.levelName(key)
      setSelect(newText)
      $('#previous-level-input').val(newText)
      break
    case 39:
    case 40:
      oldText = $('#level-select').find('option:selected').val()
      key = oldText ? game.levelIndex(oldText) + 1 : 0
      if (key >= game.numLevels()) key = game.numLevels() - 1
      newText = game.levelName(key)
      setSelect(newText)
      $('#previous-level-input').val(newText)
      break
    default:
      // Nothing
  }
})

game.selectLevel(game.currentLevel())
