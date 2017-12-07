/* global $ */

require('arrowkeys')
const rgbHex = require('rgb-hex')

function Board () {
  let self = this
  self.baseColor = null
  self.rows = null
  self.cols = null
  self.characters = {}
  self.goal = null
  self.goalName = null

  function hexColor (color) {
    return color.includes('rgb') ? '#' + rgbHex(color) : color
  }

  this.startKnights = function () {
    Object.keys(self.characters).forEach(function (key) {
      let c = self.characters[key]
      if (c.id.includes('knight')) {
        c.startMoving(function () {
          console.log('moving!')
          let dirs = ['up', 'down', 'left', 'right']
          let direction = dirs[Math.floor(Math.random() * 4)]
          self.move(c.id, direction)
        })
      }
    })
  }

  this.stopKnights = function () {
    Object.keys(self.characters).forEach(function (key) {
      let c = self.characters[key]
      if (c.id.includes('knight')) c.stopMoving()
    })
  }

  this.hasWon = function () {
    for (let i = 0; i < self.rows; i++) {
      for (let j = 0; j < self.cols; j++) {
        let color = hexColor($('#' + i + '_' + j)[0].style.background)
        if (color !== self.goal) return false
      }
    }
    return true
  }

  this.endGame = function (message) {
    self.stopKnights()
    $(document).arrowkeysUnbind()
    let wonDiv = $('#endgame-message')[0]
    wonDiv.innerHTML = message
    wonDiv.style.display = 'block'
  }

  this.win = function () {
    this.endGame('You win!')
    for (let i = 0; i < self.rows; i++) {
      for (let j = 0; j < self.cols; j++) {
        $('#' + i + '_' + j).addClass('flash')
      }
    }
  }

  this.add = function (character, element) {
    let td = $(element)[0] // Get element by selector or responseds with element if it is an element
    if (!td) return false
    td.innerHTML = '<img src="' + character.image + '">'
    td.style.padding = '6px 6px 6px 6px'
    td.style.background = character.transformColor(hexColor(td.style.background))
    $(element).addClass(character.id)
    return true
  }

  this.remove = function (character, element) {
    let td = $(element)[0]
    if (!td) return false
    td.innerHTML = ''
    td.style.padding = '40px 40px 40px 40px'
    $(element).removeClass(character.id)
    return true
  }

  this.move = function (id, direction) {
    // Give characters locations?
    let character = this.characters[id]
    let currentId = $('.' + character.id)[0].id
    let rowCol = currentId.split('_')
    let newId = null
    switch (direction) {
      case 'up':
        newId = '#' + (parseInt(rowCol[0]) - 1) + '_' + rowCol[1]
        break
      case 'down':
        newId = '#' + (parseInt(rowCol[0]) + 1) + '_' + rowCol[1]
        break
      case 'left':
        newId = '#' + rowCol[0] + '_' + (parseInt(rowCol[1]) - 1)
        break
      case 'right':
        newId = '#' + rowCol[0] + '_' + (parseInt(rowCol[1]) + 1)
        break
      default:
        throw new Error('Bad direction keyword:', direction)
    }
    let dest = $(newId)[0]
    if (dest) {
      if (dest.className) {
        this.endGame('The knight killed you. You lose!')
        if (dest.className.includes('knight')) {
          this.remove(character, '#' + currentId)
        } else if (dest.className.includes('dragon')) {
          let classId = dest.className.split().find(function (cl) {
            return self.characters[cl]
          })
          this.remove(self.characters[classId], dest)
          this.remove(character, '#' + currentId)
          this.add(character, dest)
        }
      } else if (this.add(character, dest)) {
        this.remove(character, '#' + currentId)
        if (this.hasWon()) this.win()
      }
    }
  }

  this.setup = function (levelData, characters) {
    $(document).arrowkeys()
    self.baseColor = levelData.baseColor
    self.rows = levelData.rows
    self.cols = levelData.cols
    self.characters = {}
    characters.forEach(function (c) { self.characters[c.id] = c })
    self.goal = levelData.goalColor
    self.goalName = levelData.type

    let goalDiv = $('#objective-color')[0]
    goalDiv.innerHTML = self.goalName
    goalDiv.style.color = self.goal
    let table = document.createElement('TABLE')
    table.id = 'dragon_board'
    let tr = null
    let td = null
    for (let i = 0; i < self.rows; i++) {
      tr = document.createElement('TR')
      for (let j = 0; j < self.cols; j++) {
        td = document.createElement('TD')
        td.style.background = self.baseColor
        td.id = i + '_' + j
        Object.keys(self.characters).forEach(function (key) {
          let c = self.characters[key]
          if (c.startIndex === td.id) {
            self.add(c, td)
            td.style.background = c.startSquare || self.baseColor
          }
        })
        tr.appendChild(td)
      }
      tr.appendChild(td)
      table.appendChild(tr)
    }
    document.getElementById('board').appendChild(table)
    self.startKnights()
  }

  this.delete = function () {
    $('#dragon_board').remove()
    $('#endgame-message')[0].style.display = 'none'
    $(document).arrowkeysUnbind()
    self.stopKnights()
  }
}

const board = new Board()

$(document)
  .on('upkey', function () {
    board.move('dragon', 'up')
  })
  .on('downkey', function () {
    board.move('dragon', 'down')
  })
  .on('leftkey', function () {
    board.move('dragon', 'left')
  })
  .on('rightkey', function () {
    board.move('dragon', 'right')
  })

module.exports = board
