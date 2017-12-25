/* global $ */

const Board = require('./board.js')
const Direction = require('./direction.js')

function Game (levels) {
  let self = this
  this.levels = levels
  this.curLvId = 0
  this.board = new Board()
  this.state = 'unset' // playing, won, lost, paused

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
    let vector = Direction.makeVector(direction)
    let dest = self.board.getRelativeSpace(vector, currentSpace)

    let added = self.add(character, dest)
    if (added) {
      self.board.remove(character, currentSpace)
      if (this.hasWon()) this.win()
    }
  }

  this.updatingFacing = function (character) {
    let space = self.board.getSpace(character)
    self.board.remove(character, space)
    self.board.add(character, space)
  }

  function typicalMove (character) {
    let freq = character.baseFreq
    character.setFrequency(Math.random() * freq + freq / 2)
    // TODO character.canFace
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
            self.updatingFacing(bow)
          } else if (!bow.arrow.moving) {
            let arrow = bow.arrow
            arrow.aim(bow.facing.word)
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
    self.board.clearAnimation()
    let wonDiv = $('#endgame-message')[0]
    wonDiv.innerHTML = message
    wonDiv.style.display = 'block'
  }

  this.win = function () {
    self.state = 'won'
    this.endGame('<p style="color: #11ee11">You win!</p>')
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

  this.getCurrentPlayer = function () {
    return self.board.characters['dragon_1']
  }

  this.moveCurrentPlayer = function (direction) {
    self.move(this.getCurrentPlayer(), direction)
  }

  this.winGame = function () {
    self.clearCurrentLevel()
    let message = $('#level-description')[0]
    message.innerHTML = '<p style="color: #11ee11">Your dragonlings have conquered!<br>You beat the game!</p>'
    // TODO place with all colors declared
  }

  this.clearCurrentLevel = function () {
    self.state = 'unset'
    $('#level-description')[0].innerHTML = ''
    $('#next-level')[0].style.display = 'none'
    $('#endgame-message')[0].style.display = 'none'
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
    $('#level-number')[0].innerHTML = levelKey
    $('#level-description')[0].innerHTML = level.description
    // TODO by player-characters not buttons
    $('.player-button').each((i, b) => {
      b.className = ''
      let dragon = level.getDragons()[i]
      b.className = 'player-button ' + dragon.type + '-player' + (i === 0 ? ' selected' : '')
      b.innerHTML = dragon.name
    })

    self.board.setup(level.baseColors, level.characters)
    this.startBadGuys()
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
