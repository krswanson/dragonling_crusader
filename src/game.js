/* global $ */

const Board = require('./board.js')
const Direction = require('./direction.js')
const setButtonType = require('./setButtonType.js')
const color = require('./colors.js')

function Game (levels) {
  let self = this
  this.levels = levels
  this.curLvId = 0
  this.currentPlayer = null
  this.board = new Board()
  this.state = 'unset' // playing, won, lost, paused

  this.getCurrentPlayer = function () {
    let id = $('.player-button.selected')[0].value
    if (id) return self.board.characters[id]

    console.error('Could not get current player id from element:', $('.player-button.selected')[0])
    return null
  }

  this.destroyArrow = function (character) {
    if (character.id.includes('arrow')) {
      character.stopMoving()
      let space = self.board.getSpace(character)
      if (space) self.board.remove(character, space)
    }
  }

  this.add = function (character, dest) {
    if (!dest) { // Off edge of board
      self.destroyArrow(character)
      return false
    } else if (!character.validSpace(dest)) {
      return false
    }

    let destChar = self.board.getCharacter(dest)
    if (destChar) { // Already a character on the space
      if (destChar.isPlayer === character.isPlayer) {
        // if both bad guys or both player-characters
        // if it's an arrow moving onto a bad guy, destroy arrow
        // otherwise do nothing (nobody moves)
        this.destroyArrow(character)
        return false
      } else {
        if (destChar.isPlayer) { // Bad guy lands on player
          this.lose(character)
          self.board.remove(destChar, dest)
          self.board.add(character, dest)
          return true
        } else { // Player landed on bad guy
          this.lose(destChar)
          return true // Let calling function know to remove from current space
        }
      }
    }
    // Empty space, add normally
    return self.board.add(character, dest)
  }

  this.move = function (character, direction) {
    let originalChar = character
    if (typeof character === 'string') character = self.board.characters[character]
    if (!character || character.constructor.name !== 'Character') return console.error('Invalid character or character id:', originalChar)

    let currentSpace = self.board.getSpace(character)
    let dir = new Direction(direction)
    let dest = self.board.getRelativeSpace(dir.vector(), currentSpace)

    character.face(dir)
    self.board.updateImage(character)

    let added = self.add(character, dest)
    if (added) {
      self.board.remove(character, currentSpace)
      if (this.hasWon()) this.win()
    }
  }

  function typicalMove (character) {
    let freq = character.baseFreq
    character.setFrequency(Math.random() * freq + freq / 2)
    // TODO: can move?
    let dirs = ['up', 'down', 'left', 'right']
    return dirs[Math.floor(Math.random() * 4)]
  }

  this.startBadGuys = function () {
    let characters = self.board.characters
    Object.keys(characters).forEach(function (key) {
      let c = characters[key]
      if (c.id.includes('knight') || c.id.includes('wizard')) {
        c.startMoving(function () {
          let direction = typicalMove(c)
          self.move(c, direction)
        })
      } else if (c.id.includes('bow') && !c.id.includes('arrow')) {
        let bow = c
        bow.startMoving(function () {
          typicalMove(bow)
          let shoot = Math.random() > 0.5
          if (!shoot) {
            let options = bow.facingOptions
            let direction = options[Math.floor(Math.random() * options.length)]
            bow.face(direction)
            self.board.updateImage(bow)
          } else if (!bow.arrow.moving) {
            let arrow = bow.arrow
            arrow.face(bow.facing.word)
            arrow.startMoving(function () {
              arrow.moving = true
              if (!self.board.getSpace(arrow)) {
                let dest = self.board.getRelativeSpace(arrow.facing, self.board.getSpace(bow))
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
    let characters = self.board.characters
    Object.keys(characters).forEach(function (key) {
      let c = characters[key]
      if (!c.id.includes('dragon')) c.stopMoving()
    })
  }

  this.hasWon = function () {
    let goalColors = self.currentLevel().goalColors
    for (let i = 0; i < self.board.rows; i++) {
      for (let j = 0; j < self.board.cols; j++) {
        let color = self.board.getColor(i, j)
        let goal = goalColors[i][j]
        if (goal && color !== goal) return false
      }
    }
    return true
  }

  this.endGame = function (message) {
    this.stopBadGuys()
    self.board.clearAllAnimation()
    let wonDiv = $('#endgame-message')[0]
    wonDiv.innerHTML = message
    wonDiv.style.display = 'block'
  }

  this.win = function () {
    self.state = 'won'
    this.endGame('<p style="color: ' + color.GREEN + '">You win!</p>')
    self.board.flash()
    $('#next-level')[0].style.display = 'block'
  }

  this.lose = function (byChar) {
    self.state = 'lost'
    this.endGame('<p style="color: #ff2222">The ' + byChar.name + ' has killed you. You lose!</p>')
  }

  this.levelKeys = function () { return Object.keys(self.levels) }

  this.numLevels = function () { return self.levelKeys().length }

  this.levelIndex = function (lvName) {
    let index = self.levelKeys().indexOf(lvName)
    if (index < 0) return null
    else return index
  }

  this.levelName = function (index) {
    if (!Number.isInteger(index)) return null
    let keys = self.levelKeys()
    if (index < 0 || index >= keys.length) return null
    return keys[index]
  }

  this.currentLevelIndex = function () {
    return self.curLvId
  }

  this.currentLevelName = function () {
    return this.levelName(self.currentLevelIndex())
  }

  this.currentLevel = function () {
    return self.levels[self.currentLevelName()]
  }

  this.validLevel = function (key) {
    return (self.levelIndex(key) !== null) || (self.levelName(key) !== null)
  }

  this.isPlaying = function () {
    return self.state === 'playing'
  }

  this.moveCurrentPlayer = function (direction) {
    self.move(this.getCurrentPlayer(), direction)
  }

  this.winGame = function () {
    self.clearCurrentLevel()
    let message = $('#level-description')[0]
    message.innerHTML = '<p style="color: ' + color.GREEN + '">Your dragonlings have conquered!<br>You beat the game!</p>'
    // TODO place with all colors declared
  }

  this.clearCurrentLevel = function () {
    self.state = 'unset'
    $('#level-description')[0].innerHTML = ''
    $('#next-level')[0].style.display = 'none'
    $('#endgame-message')[0].style.display = 'none'
    $('.player-button').remove()
    self.stopBadGuys()
    let characters = self.board.characters
    Object.keys(characters).forEach(key => {
      let c = characters[key]
      c.setStartFacing(c.startFacing.word)
    })
    self.board.delete()
  }

  this.startLevel = function (levelKey) {
    self.clearCurrentLevel()
    let level = self.levels[levelKey]

    self.state = 'playing'
    self.curLvId = this.levelIndex(levelKey)
    self.board.setup(level.baseColors, level.characters)
    this.startBadGuys()
    $('#level-number')[0].innerHTML = levelKey
    $('#level-description')[0].innerHTML = level.description
    level.getCharacters()
      .filter(c => { return c.isPlayer })
      .forEach((c, i) => {
        let selected = i === 0
        if (!selected) self.board.clearAnimation(c)
        let b = document.createElement('BUTTON')
        b.className = 'player-button ' + c.type + '-player' + (selected ? ' selected' : '')
        setButtonType(b, c.type, selected)
        b.innerText = c.name
        b.value = c.id
        b.addEventListener('click', () => {
          if (b.className.includes('selected')) return

          let oldChar = self.getCurrentPlayer()
          b.parentNode.childNodes.forEach(el => {
            let selected = el === b
            setButtonType(el, self.board.characters[el.value].type, selected)
            if (selected) {
              el.classList.add('selected')
            } else {
              el.classList.remove('selected')
            }
          })
          let newChar = self.getCurrentPlayer()
          self.board.clearAnimation(oldChar)
          self.board.addAnimation(newChar)
        })
        $('#player-buttons').append(b)
      })
  }

  this.selectLevel = function (key) {
    let givenKey = key
    if (Number.isInteger(key)) key = self.levelName(key)
    if (!key) {
      if (givenKey >= self.numLevels()) {
        self.board.delete()
        return self.winGame()
      } else {
        return console.error('Problem loading level. Bad key:', givenKey)
      }
    }
    this.startLevel(key)
  }
}

module.exports = Game
