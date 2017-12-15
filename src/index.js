/* global $ */

const board = require('./board.js')
const levels = require('./levelSetup.js')

let currentLevel = 0
let levelKeys = Object.keys(levels)

function setSelect (levelKey) {
  console.log('levelKey', levelKey)
  $('option[value=' + levelKey + ']', document)
  .attr('selected', true).siblings()
  .removeAttr('selected')
  $('')
}

$(document).on('change', 'select', function () {
  setSelect(this.value)
})

function inputClick (input) {
  $(input).closest('div').find('select').slideToggle(110)
}

function updateSelectText (element) {
  console.log($(element))
  $(element).hide().closest('div').find('input').val($(element).find('option:selected').text())
}

function winGame () {
  let message = $('#level-description')[0]
  message.innerHTML = 'Your dragonlings have conquered!<br>You beat the game!'
  message.style.color = '#11ee11'
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
  setSelect(key)
  board.setup(level)
  currentLevel = levelKeys.indexOf(key)
}

levelKeys.forEach(function (key, i) {
  let option = document.createElement('OPTION')
  option.value = key
  option.innerHTML = 'Level ' + (i + 1)
  let select = document.getElementById('level-select')
  if (i === 0) select.value = key
  select.appendChild(option)
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
document.getElementById('level-select-button').addEventListener('click', function () {
  selectLevel($('#level-select')[0].value)
})
document.getElementById('previous-level-input').addEventListener('click', function () {
  inputClick(this)
})

selectLevel(currentLevel)
