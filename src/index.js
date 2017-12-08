/* global $ */

const board = require('./board.js')
const levels = require('./levels.js')
let Dragon = require('./dragon.js')
let Knight = require('./knight.js')

let knight = new Knight()

$(document).on('change', 'select', function () {
  $('option[value=' + this.value + ']', this)
  .attr('selected', true).siblings()
  .removeAttr('selected')
})

let selectLevel = function () {
  board.delete()
  let level = levels[ $('#level_select')[0].value ]
  let dragon = new Dragon(level.mapping, level.goalColor, level.type)
  dragon.addInvalidColor('gray')
  board.setup(level, [ dragon, knight ])
}

Object.keys(levels).forEach(function (key, i) {
  let option = document.createElement('OPTION')
  option.value = key
  option.innerHTML = 'Level ' + (i + 1)
  let select = document.getElementById('level_select')
  if (i === 0) select.value = key
  select.appendChild(option)
})

document.getElementById('level_button').addEventListener('click', selectLevel)
selectLevel()
