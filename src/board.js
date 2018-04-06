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

  this.getCharacterByIndex = function (row, col) {
    return self.getCharacter($('#' + row + '_' + col)[0])
  }

  this.getColor = function (row, col) {
    return hexColor($('#' + row + '_' + col)[0].style.backgroundColor)
  }

  this.changeBackground = function (space, character) {
    let transform = character.colorRelativeSquares(hexColor(space.style.backgroundColor))
    transform.squares.forEach(s => {
      let newTd = this.getRelativeSpace(s, space)
      if (newTd) newTd.style.backgroundColor = transform.transformColor(hexColor(newTd.style.backgroundColor))
    })
  }

  this.validateSpace = function (space) {
    if (!$(space)[0] || typeof space !== 'object') {
      console.error('Can\'t add character to space, bad element object:', space)
      return false
    }
    return true
  }

  function imageHTML (character) {
    return '<img src="' + character.getBackImage() + '"/><img class="top" src="' + character.getForeImage() + '"/>'
  }

  this.updateImage = function (character) {
    this.getSpace(character).innerHTML = imageHTML(character)
  }

  this.add = function (character, space) {
    if (!this.validateSpace(space)) return false
    this.changeBackground(space, character)
    space.classList.add(character.id)
    space.classList.add('animate')
    space.innerHTML = imageHTML(character)
    space.style.padding = '6px 6px 6px 6px'
    return true
  }

  this.remove = function (character, space = null) {
    if (!space) space = self.getSpace(character)
    if (!this.validateSpace(space)) return false
    space.innerHTML = ''
    space.style.padding = '40px 40px 40px 40px'
    space.classList.remove(character.id)
    space.classList.remove('animate')
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
    return $('#dragon_board td.' + character.id)[0]
  }

  this.addAnimation = function (character) {
    this.getSpace(character).className += ' animate'
  }

  this.clearAnimation = function (character) {
    if (!character || typeof character.id !== 'string') return console.error('Bad character:', character)
    $('.' + character.id).removeClass('animate')
  }

  this.clearAllAnimation = function () {
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
        td.style.backgroundColor = baseColors[i][j].color
        tr.appendChild(td)
      }
      table.appendChild(tr)

      // TODO better way to deal with how row with all-images gets compressed
      tr.style.height = '83px'
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
