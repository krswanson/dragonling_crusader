/* global $ */

function EventHandlers (levels) {
  let self = this
  this.levels = levels
  this.currentLevelIndex = 0
  this.board = require('./board.js')

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

  this.currentLevel = function () {
    return self.currentLevelIndex
  }

  this.currentLevelName = function () {
    return this.levelName(self.currentLevelIndex)
  }

  this.validLevel = function (key) {
    return (self.levelIndex(key) !== null) || (self.levelName(key) !== null)
  }

  this.winGame = function () {
    let message = $('#level-description')[0]
    message.innerHTML = '<p style="color: #11ee11">Your dragonlings have conquered!<br>You beat the game!</p>'
    // TODO place with all colors declared
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
    let level = self.levels[key]
    $('#level-number')[0].innerHTML = key
    self.board.setup(level)
    self.currentLevelIndex = self.levelIndex(key)
  }
}

module.exports = EventHandlers
