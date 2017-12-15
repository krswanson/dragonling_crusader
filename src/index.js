/* global $ */

const board = require('./board.js')
const levels = require('./levelSetup.js')

let currentLevel = 0
let levelKeys = Object.keys(levels)

function setSelect (levelKey) {
  $('#level-select')[0].value = levelKey
  $('option[value="' + levelKey + '"]', document)
  .attr('selected', true).siblings()
  .removeAttr('selected')
}

let closed = true

function inputClick (input) {
  closed = !closed
  $(input).closest('div').find('select').slideToggle(110)
}

function updateSelectText (element) {
  $(element).hide().closest('div').find('input').val($(element).find('option:selected').text())
}

function winGame () {
  let message = $('#level-description')[0]
  message.innerHTML = '<p style="color: #11ee11">Your dragonlings have conquered!<br>You beat the game!</p>'
  // TODO place with all colors declared
}

let selectLevel = function (key) {
  let givenKey = key
  if (Number.isInteger(key)) key = levelKeys[key]
  let level = key ? levels[key] : null
  if (!key) {
    if (givenKey >= levelKeys.length) {
      board.delete()
      return winGame()
    } else {
      return console.error('Problem loading level. Bad key:', givenKey)
    }
  }
  $('#level-number')[0].innerHTML = key
  board.setup(level)
  currentLevel = levelKeys.indexOf(key)
}

levelKeys.forEach(function (key, i) {
  let option = document.createElement('OPTION')
  option.value = key
  option.innerHTML = key
  let select = document.getElementById('level-select')
  if (i === 0) select.value = key
  select.appendChild(option)
})

$(document).on('change', 'select', function () {
  setSelect(this.value)
})
document.getElementById('restart-level').addEventListener('click', function () {
  selectLevel(currentLevel)
})
document.getElementById('next-level').addEventListener('click', function () {
  setSelect(levelKeys[currentLevel])
  updateSelectText('#level-select')
  selectLevel(currentLevel + 1)
})
document.getElementById('level-select').addEventListener('click', function () {
  updateSelectText(this)
})
document.getElementById('level-select-button')
.addEventListener('click', function () {
  let input = $('#previous-level-input')[0].value || $('#level-select')[0].value
  if (levelKeys.indexOf(input) >= 0) selectLevel(input)
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
prevLevelInput.addEventListener('keyup', function(event) {
    event.preventDefault()
    console.log('event', event.which)
    let oldText = $('#level-select').find('option:selected').val()
    let key = null
    let newText = null
    switch (event.which) {
      case 13:
        if (!closed) inputClick(this)
        newText = $('#previous-level-input').val()
        console.log('vals', newText, levelKeys.indexOf(newText))
        if (levelKeys.indexOf(newText) >= 0) setSelect(newText)
        document.getElementById('level-select-button').click()
        break;
      case 37:
      case 38:
        key = oldText ? levelKeys.indexOf(oldText) - 1 : 0
        if (key < 0) key = 0
        newText = levelKeys[key]
        setSelect(newText)
        $('#previous-level-input').val(newText)
        break;
      case 39:
      case 40:
        oldText = $('#level-select').find('option:selected').val()
        key = oldText ? levelKeys.indexOf(oldText) + 1 : 0
        if (key >= levelKeys.length) key = levelKeys.length - 1
        newText = levelKeys[key]
        setSelect(newText)
        $('#previous-level-input').val(newText)
        break;
      default:
        // Nothing
    }
})

selectLevel(currentLevel)
