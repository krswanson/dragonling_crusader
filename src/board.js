/* global $ */

const hexColor = require('./hexColor.js')
const Direction = require('./direction.js')

function Board () {
  let self = this
  self.rows = null
  self.cols = null
  self.characters = {}
  self.baseColors = null
  self.goalColors = null
  self.state = 'unset' // playing, won, lost, paused

  this.isPlaying = function () {
    return self.state === 'playing'
  }

  function typicalMove (character) {
    let freq = character.baseFreq
    character.setFrequency(Math.random() * freq + freq / 2)
    let dirs = ['up', 'down', 'left', 'right']
    return dirs[Math.floor(Math.random() * 4)]
  }

  this.startBadGuys = function () {
    Object.keys(self.characters).forEach(function (key) {
      let c = self.characters[key]
      if (c.id.includes('knight') || c.id.includes('wizard')) {
        c.startMoving(function () {
          let direction = typicalMove(c)
          self.move(c.id, direction)
        })
      } else if (c.id.includes('bow') && !c.id.includes('arrow')) {
        let bow = c
        bow.startMoving(function () {
          typicalMove(bow)
          let shoot = Math.random() > 0.5
          if (!shoot) {
            let options = bow.canFace
            let direction = options[Math.floor(Math.random() * options.length)]
            bow.aim(direction)
            let space = self.getSpace(bow)
            self.remove(bow, space)
            self.add(bow, space)
          } else if (!bow.arrow.moving) {
            let arrow = bow.arrow
            arrow.aim(bow.facing.word)
            arrow.startMoving(function () {
              arrow.moving = true
              if (!self.getSpace(arrow)) {
                let dest = self.getRelativeSpace(arrow.facing, self.getSpace(bow))
                self.add(arrow, dest)
              } else {
                self.move(arrow, arrow.facing)
              }
            })
          }
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
        let goal = self.goalColors[i][j]
        if (goal && color !== goal) return false
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
    this.endGame('<p style="color: #ff2222">The ' + name + ' has killed you. You lose!</p>')
  }

  this.getRelativeSpace = function (direction, fromSpace) {
    let vector = Direction.makeVector(direction)
    let rowCol = fromSpace.id.split('_')
    return document.getElementById((parseInt(rowCol[0]) + vector[0]) + '_' + (parseInt(rowCol[1]) + vector[1]))
  }

  this.changeBackground = function (space, character) {
    let transform = character.colorRelativeSquares(hexColor(space.style.background))
    transform.squares.forEach(s => {
      let newTd = this.getRelativeSpace(s, space)
      if (newTd) newTd.style.background = transform.transformColor(hexColor(newTd.style.background))
    })
  }

  this.destroyArrow = function (character) {
    if (character.id.includes('arrow')) {
      character.stopMoving()
      let arrowTd = $('.' + character.id)[0]
      if (arrowTd) self.remove(character, arrowTd)
    }
  }

  this.add = function (character, element) {
    let dest = $(element)[0] // Get element by selector or responseds with element if it is an element
    if (!dest) { // Off edge of board
      self.destroyArrow(character)
      return false
    }

    let destChar = self.getCharacter(dest)
    if (!character.validSpace(dest)) {
      return false
    } else if (destChar) { // Already a character on the space
      if (destChar.isPlayer === character.isPlayer) {
        // if both bad guys or both player-characters
        // if it's an arrow moving onto a bad guy, destroy arrow
        // otherwise do nothing (nobody moves)
        self.destroyArrow(character)
        return false
      } else {
        if (destChar.isPlayer) { // Bad guy lands on player
          this.lose(character)
          this.remove(destChar, dest)
          this.add(character, dest)
          return true
        } else { // Player landed on bad guy
          this.lose(destChar)
          return true // Let calling function know to remove from current space
        }
      }
    }

    // Empty space, add normally
    dest.innerHTML = '<img src="' + character.image[1] + '"/><img class="top" src="' + character.image[0] + '"/>'
    dest.style.padding = '6px 6px 6px 6px'
    this.changeBackground(dest, character)
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

  this.getSpace = function (character) {
    return $('.' + character.id)[0]
  }

  // TODO hand in id not character?
  this.move = function (character, direction) {
    let vector = direction
    if (direction.constructor.name === 'Direction') vector = direction.vector()
    else if (typeof vector === 'string') vector = Direction.convertToVector(direction)
    else if (!Array.isArray(direction)) return console.error('Bad direction:', direction)

    let char = character
    if (typeof character === 'string') char = self.characters[character]
    if (!char || char.constructor.name !== 'Character') return console.error('Invalid character or character id:', character)

    let currentSpace = this.getSpace(char)
    let dest = this.getRelativeSpace(direction, currentSpace)

    let added = this.add(char, dest)
    if (added) {
      this.remove(char, currentSpace)
      if (this.hasWon()) this.win()
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
    Object.keys(self.characters).forEach(key => {
      let c = self.characters[key]
      c.setStartFacing(c.startFacing.word)
    })
  }
}

module.exports = Board
