
/* global $ */

const Board = require('./elements/board.js')
const Direction = require('./helpers/direction.js')
const PlayerButtons = require('./elements/playerButtons.js')
const LevelInfo = require('./elements/levelInfo.js')
const color = require('./colors.js')

function Game (levels) {
  let self = this
  this.levels = levels
  this.curLvId = 0
  this.currentPlayer = null
  this.board = new Board()
  this.state = 'unset' // pre-start, playing, won, lost

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

  function scareArcher (dest) {
    // TODO currently assumes only down
    let bowSpace = self.board.getRelativeSpace('down', dest)
    let bow = self.board.getCharacter(bowSpace)
    if (bow && bow.name === 'archer') {
      bow.stopMoving()
      if (!bow.arrow.moving) bow.arrow.stopMoving() // If func set but not added to board
      bow.face('down_right', 'override')
      self.board.updateImage(bow)
      let count = 0
      bow.startMoving(function () {
        if (count === 0) {
          self.move(bow, 'down')
          count++
        } else {
          self.board.remove(bow)
          bow.stopMoving()
        }
      })
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
          this.lose(destChar, character)
          self.board.remove(destChar, dest)
          self.board.add(character, dest)
          return true
        } else { // Player landed on bad guy
          this.lose(character, destChar)
          return true // Let calling function know to remove from current space
        }
      }
    }
    // Empty space, add normally
    let added = self.board.add(character, dest)
    if (added && character.name === 'sea serpent') scareArcher(dest)
    return added
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
      } else if (c.name === 'archer') {
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
    let goals = self.currentLevel().goalColors
    for (let i = 0; i < self.board.rows; i++) {
      for (let j = 0; j < self.board.cols; j++) {
        let color = self.board.getColor(i, j)
        let char = self.board.getCharacterByIndex(i, j)
        let goalColor = goals[i][j].color
        let goalChar = goals[i][j].char
        if (goalColor && color !== goalColor) return false
        if (goalChar && char !== goalChar) return false
      }
    }
    return true
  }

  this.disablePlayerButtons = function () {
    self.currentLevel().getPlayers().forEach(p => {
      PlayerButtons.getButton(p).removeEventListener('click', p.buttonFunc)
    })
  }

  this.endGame = function (message) {
    self.stopBadGuys()
    self.disablePlayerButtons()
    self.board.clearAllAnimation()
    LevelInfo.setEndgameDiv(message)
    let screen = $('#board-screen')[0]
    screen.style.display = 'block'
    let h = window.matchMedia('only screen and (max-width: 768x)').matches ? 45 : 83
    screen.style.height = (self.board.rows * h + 30) + 'px'
  }

  this.win = function () {
    self.state = 'won'
    self.board.flash()
    if (self.numLevels() > self.currentLevelIndex() + 1) { // Not yet final level
      self.endGame('<p style="color: ' + color.GREEN + '">You win!</p>')
      $('#next-level')[0].style.display = 'inline-block'
    } else {
      self.winGame()
    }
  }

  this.lose = function (killedChar, byChar) {
    self.state = 'lost'
    this.endGame('<p style="color: #ff2222">The ' + byChar.name + ' has killed your ' + killedChar.name + '. You lose!</p>')
    document.getElementById('restart-level').style.display = 'inline-block'
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
    self.disablePlayerButtons()
    LevelInfo.set('<p style="color: ' + color.GREEN + '">Your dragonlings have conquered!<br>You beat the game!</p>')
  }

  this.clearCurrentLevel = function () {
    self.state = 'unset'
    LevelInfo.set('')
    $('#next-level')[0].style.display = 'none'
    $('.player-button').remove()
    self.stopBadGuys()
    let characters = self.board.characters
    Object.keys(characters).forEach(key => {
      let c = characters[key]
      c.setStartFacing(c.startFacing.word)
    })
    self.board.delete()
  }

  this.setCurrentPlayer = function (newChar) {
    let oldChar = self.getCurrentPlayer()
    let b = PlayerButtons.getButton(newChar)
    b.parentNode.childNodes.forEach(el => {
      let selected = el === b
      PlayerButtons.setButtonType(el, self.board.characters[el.value].type, selected)
      if (selected) {
        el.classList.add('selected')
      } else {
        el.classList.remove('selected')
      }
    })
    self.board.clearAnimation(oldChar)
    self.board.addAnimation(newChar)
  }

  this.setupLevel = function (levelKey) {
    self.clearCurrentLevel()
    let level = self.levels[levelKey]
    self.state = 'pre-start'
    self.curLvId = this.levelIndex(levelKey)
    self.board.setup(level.baseColors, level.characters)
    level.getCharacters().forEach(c => { self.board.clearAnimation(c) })
    $('#level-number')[0].innerHTML = levelKey
    LevelInfo.set(level.description, level.objective)
    PlayerButtons.displayPlayerButtons(level.getCharacters())
  }

  // Assumes setupLevel
  this.startLevel = function (levelKey) {
    self.state = 'playing'
    this.startBadGuys()
    let level = self.levels[levelKey]
    level.getPlayers().forEach((c, i) => {
      let b = PlayerButtons.getButton(c)
      if (b.className.includes('selected')) self.board.addAnimation(c)
      c.buttonFunc = function () {
        if (b.className.includes('selected')) return
        self.setCurrentPlayer(c)
      }
      b.addEventListener('click', c.buttonFunc)
    })

    self.board.getAllSpaces().forEach(s => {
      s.addEventListener('click', () => {
        let c = self.board.getCharacter(s)
        if (!c || !c.isPlayer) { // Attempt to move player
          let direction = self.board.directionOfSpace(self.getCurrentPlayer(), s)
          if (['left', 'right', 'up', 'down'].includes(direction)) { // Space is next to current player
            self.moveCurrentPlayer(direction)
          }
        } else { // is player
          self.setCurrentPlayer(c)
        }
      })
    })
  }

  this.selectLevel = function (key) {
    let givenKey = key
    if (Number.isInteger(key)) key = self.levelName(key)
    if (!key || self.levelName(key)) {
      return console.error('Problem loading level. Bad key:', givenKey)
    }
    this.setupLevel(key)
  }
}

module.exports = Game
