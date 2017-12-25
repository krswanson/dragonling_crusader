/* global $ */

const hexColor = require('./hexColor.js')
const Direction = require('./direction.js')

function Board () {
  let self = this
  self.rows = 0
  self.cols = 0
  self.characters = {}

  this.getRelativeSpace = function (direction, fromSpace) {
    let vector = Direction.makeVector(direction)
    let rowCol = fromSpace.id.split('_')
    return document.getElementById((parseInt(rowCol[0]) - vector[1]) + '_' + (parseInt(rowCol[1]) + vector[0]))
  }

  this.getColor = function (row, col) {
    return hexColor($('#' + row + '_' + col)[0].style.background)
  }

  this.changeBackground = function (space, character) {
    let transform = character.colorRelativeSquares(hexColor(space.style.background))
    transform.squares.forEach(s => {
      let newTd = this.getRelativeSpace(s, space)
      if (newTd) newTd.style.background = transform.transformColor(hexColor(newTd.style.background))
    })
  }

  this.validateSpace = function (space) {
    if (!$(space)[0] || typeof space !== 'object') {
      console.error('Can\'t add characterto space, bad element object:', space)
      return false
    }
    return true
  }

  this.add = function (character, space) {
    if (!this.validateSpace(space)) return false
    space.innerHTML = '<img src="' + character.image[1] + '"/><img class="top" src="' + character.image[0] + '"/>'
    space.style.padding = '6px 6px 6px 6px'
    this.changeBackground(space, character)
    $(space).addClass(character.id).addClass('animate')
    return true
  }

  this.remove = function (character, space) {
    if (!this.validateSpace(space)) return false
    space.innerHTML = ''
    space.style.padding = '40px 40px 40px 40px'
    $(space).removeClass(character.id).removeClass('animate')
    return true
  }

  this.getCharacter = function (space) {
    if (!this.validateSpace(space)) return null
    let charId = space.className.split(/\s+/).find(function (cl) {
      return self.characters[cl]
    })
    return self.characters[charId]
  }

  this.getSpace = function (character) {
    return $('.' + character.id)[0]
  }

  this.clearAnimation = function () {
    $('.animate').removeClass('animate')
  }

  this.flash = function () {
    for (let i = 0; i < self.rows; i++) {
      for (let j = 0; j < self.cols; j++) {
        $('#' + i + '_' + j).addClass('flash')
      }
    }
  }

  this.setup = function (baseColors, characters) {
    this.delete()
    self.rows = baseColors.length
    self.cols = baseColors[0].length
    self.characters = characters

    let table = document.createElement('TABLE')
    table.id = 'dragon_board'
    let tr = null
    let td = null
    for (let i = 0; i < self.rows; i++) {
      tr = document.createElement('TR')
      for (let j = 0; j < self.cols; j++) {
        td = document.createElement('TD')
        td.id = i + '_' + j
        Object.keys(self.characters).forEach(function (key) {
          let c = self.characters[key]
          if (c.startIndex === td.id) self.add(c, td)
        })
        td.style.background = baseColors[i][j]
        tr.appendChild(td)
      }
      tr.appendChild(td)
      table.appendChild(tr)
    }
    document.getElementById('board').appendChild(table)
  }

  this.delete = function () {
    $('#dragon_board').remove()
    self.rows = 0
    self.cols = 0
    self.characters = {}
  }
}

module.exports = Board
