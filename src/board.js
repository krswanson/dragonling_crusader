/* global $ */

const rgbHex = require('rgb-hex')

function Board () {
  let self = this
  self.rows = null
  self.cols = null
  self.characters = {}
  self.baseColors = null
  self.goalColors = null
  self.state = 'unset' // playing, won, lost, paused

  function hexColor (color) {
    return color.includes('rgb') ? '#' + rgbHex(color) : color
  }

  this.isPlaying = function () {
    return self.state === 'playing'
  }

  this.startBadGuys = function () {
    Object.keys(self.characters).forEach(function (key) {
      let c = self.characters[key]
      if (!c.id.includes('dragon')) {
        c.startMoving(function () {
          let freq = c.baseFreq
          c.setFrequency(Math.random() * freq + freq / 2)
          let dirs = ['up', 'down', 'left', 'right']
          let direction = dirs[Math.floor(Math.random() * 4)]
          self.move(c.id, direction)
        })
      }
    })
  }

  this.stopBadGuys = function () {
    Object.keys(self.characters).forEach(function (key) {
      let c = self.characters[key]
      if (!c.id.includes('dragon')) c.stopMoving()
    })
  }

  this.hasWon = function () {
    for (let i = 0; i < self.rows; i++) {
      for (let j = 0; j < self.cols; j++) {
        let color = hexColor($('#' + i + '_' + j)[0].style.background)
        if (color !== self.goalColors[i][j]) return false
      }
    }
    return true
  }

  this.endGame = function (message) {
    self.stopBadGuys()
    $('.animate').removeClass('animate')
    let wonDiv = $('#endgame-message')[0]
    wonDiv.innerHTML = message
    wonDiv.style.display = 'block'
  }

  this.win = function () {
    self.state = 'won'
    this.endGame('<p style="color: #11ee11">You win!</p>')
    for (let i = 0; i < self.rows; i++) {
      for (let j = 0; j < self.cols; j++) {
        $('#' + i + '_' + j).addClass('flash')
      }
    }
    $('#next-level')[0].style.display = 'block'
  }

  this.lose = function (byChar) {
    self.state = 'lost'
    let name = byChar.id.split('_')[0]
    this.endGame('<p style="color: #ff2222">The ' + name + ' killed you. You lose!</p>')
  }

  this.getTd = function (dirHor, dirVert, fromId) {
    if (!(Number.isInteger(dirHor) && Number.isInteger(dirVert))) return console.error('Bad dirHor/dirVert integer:', dirHor + '/' + dirVert)
    if (typeof fromId !== 'string') return console.error('Id is not a string:', fromId)
    let rowCol = fromId.split('_')
    return document.getElementById((parseInt(rowCol[0]) + dirVert) + '_' + (parseInt(rowCol[1]) + dirHor))
  }

  this.changeBackground = function (td, character) {
    let transform = character.colorRelativeSquares(hexColor(td.style.background))
    transform.squares.forEach(s => {
      let newTd = this.getTd(s[0], s[1], td.id)
      if (newTd) newTd.style.background = transform.transformColor(hexColor(newTd.style.background))
    })
  }

  this.add = function (character, element) {
    let td = $(element)[0] // Get element by selector or responseds with element if it is an element
    if (!td) return false
    td.innerHTML = '<img src="' + character.image[1] + '"/><img class="top" src="' + character.image[0] + '"/>'
    td.style.padding = '6px 6px 6px 6px'
    this.changeBackground(td, character)
    $(element).addClass(character.id).addClass('animate')
    return true
  }

  this.remove = function (character, element) {
    let td = $(element)[0]
    if (!td) return false
    td.innerHTML = ''
    td.style.padding = '40px 40px 40px 40px'
    $(element).removeClass(character.id).removeClass('animate')
    return true
  }

  this.getCharacter = function (td) {
    let charId = td.className.split(/\s+/).find(function (cl) {
      return self.characters[cl]
    })
    return self.characters[charId]
  }

  this.wordToNums = function (direction) {
    if (typeof direction !== 'string') return direction

    // Expected to return: [dirHor, dirVert]
    switch (direction) {
      case 'up':
        return [0, -1]
      case 'down':
        return [0, 1]
      case 'left':
        return [-1, 0]
      case 'right':
        return [1, 0]
      default:
        console.error('Bad direction keyword:', direction)
    }
  }

  this.move = function (id, direction) {
    let character = self.characters[id]
    let currentId = $('.' + character.id)[0].id
    let dirs = this.wordToNums(direction)
    let dest = this.getTd(dirs[0], dirs[1], currentId)
    // Edge of board
    // Another character
    // Terrain this character can't cross
    if (dest) { // Not off the board
      let destChar = this.getCharacter(dest)
      if (destChar) { // If another character is on the space
        if (destChar.isPlayer === character.isPlayer) {
          // Do nothing if both bad guys or both player-characters
        } else {
          if (destChar.isPlayer) { // Bad guy lands on player
            this.lose(character)
            this.remove(destChar, dest)
            this.remove(character, '#' + currentId)
            this.add(character, dest)
          } else { // Player landed on bad guy
            this.lose(destChar)
            this.remove(character, '#' + currentId)
          }
        }
      } else if (character.validSpace(dest)) {
        this.add(character, dest)
        this.remove(character, '#' + currentId)
        if (this.hasWon()) this.win()
      }
    }
  }

  this.getCurrentPlayer = function () {
    return self.characters['dragon_1']
  }

  this.moveCurrentPlayer = function (direction) {
    this.move(this.getCurrentPlayer().id, direction)
  }

  this.setup = function (levelData) {
    this.delete()
    self.state = 'playing'
    self.rows = levelData.baseColors.length
    self.cols = levelData.baseColors[0].length
    self.characters = levelData.characters
    self.goalColors = levelData.goalColors
    self.baseColors = levelData.baseColors

    $('#level-description')[0].innerHTML = levelData.description
    $('.player-button').each((i, b) => {
      b.className = ''
      let dragon = levelData.getDragons()[i]
      b.className = 'player-button ' + dragon.type + '-player' + (i === 0 ? ' selected' : '')
      b.innerHTML = dragon.name
    })
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
        td.style.background = self.baseColors[i][j]
        tr.appendChild(td)
      }
      tr.appendChild(td)
      table.appendChild(tr)
    }
    document.getElementById('board').appendChild(table)
    self.startBadGuys()
  }

  this.delete = function () {
    self.state = 'unset'
    $('#dragon_board').remove()
    $('#level-description')[0].innerHTML = ''
    $('#next-level')[0].style.display = 'none'
    $('#endgame-message')[0].style.display = 'none'
    self.stopBadGuys()
  }
}

module.exports = Board
