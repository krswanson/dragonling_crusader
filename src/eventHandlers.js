/* global $ */

const board = require('./board.js')

function EventHandlers (levels) {
  let self = this
  this.levels = levels
  this.currentLevel = 0
  this.closed = true

  this.levelKeys = function () { return Object.keys(self.levels) }
  this.numLevels = function () { return self.levelKeys().length }
  this.levelIndex = function (lvName) {
    let index = self.levelKeys().indexOf(lvName)
    if (index < 0) return null
    else return index
  }
  this.levelName = function (index) {
    let keys = self.levelKeys()
    if (index < 0 || index >= keys.length) return null
    return keys[index]
  }
  this.currentLevelName = function () {
    return this.levelName(self.currentLevel)
  }

  this.setSelect = function (levelKey) {
    $('#level-select')[0].value = levelKey
    $('option[value="' + levelKey + '"]', document)
    .attr('selected', true).siblings()
    .removeAttr('selected')
  }

  this.inputClick = function (input) {
    self.closed = !self.closed
    $(input).closest('div').find('select').slideToggle(110)
  }

  this.updateSelectText = function (element) {
    $(element).hide().closest('div').find('input').val($(element).find('option:selected').text())
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
        board.delete()
        return self.winGame()
      } else {
        return console.error('Problem loading level. Bad key:', givenKey)
      }
    }
    let level = self.levels[key]
    $('#level-number')[0].innerHTML = key
    board.setup(level)
    self.currentLevel = self.levelIndex(key)
  }

  this.setup = function () {
    $(document).on('change', 'select', function () {
      self.setSelect(this.value)
    })
    document.getElementById('restart-level').addEventListener('click', function () {
      self.selectLevel(self.currentLevel)
    })
    document.getElementById('next-level').addEventListener('click', function () {
      self.setSelect(self.currentLevelName())
      self.updateSelectText('#level-select')
      self.selectLevel(self.currentLevel + 1)
    })
    document.getElementById('level-select').addEventListener('click', function () {
      self.updateSelectText(this)
    })
    document.getElementById('level-select-button').addEventListener('click', function () {
      let input = $('#previous-level-input')[0].value || $('#level-select')[0].value
      if (self.levelIndex(input) >= 0) self.selectLevel(input)
      else {
        $('#previous-level-input').val('')
        // TOTDO error message
      }
    })

    let prevLevelInput = document.getElementById('previous-level-input')
    prevLevelInput.addEventListener('click', function () {
      self.inputClick(this)
    })
    // TODO disable dragon moving while editing input field
    prevLevelInput.addEventListener('keyup', function (event) {
      event.preventDefault()
      let oldText = $('#level-select').find('option:selected').val()
      let key = null
      let newText = null
      switch (event.which) {
        case 13:
          if (!self.closed) self.inputClick(this)
          newText = $('#previous-level-input').val()
          if (self.levelIndex(newText) >= 0) self.setSelect(newText)
          document.getElementById('level-select-button').click()
          break
        case 37:
        case 38:
          key = oldText ? self.levelIndex(oldText) - 1 : 0
          if (key < 0) key = 0
          newText = self.levelName(key)
          self.setSelect(newText)
          $('#previous-level-input').val(newText)
          break
        case 39:
        case 40:
          oldText = $('#level-select').find('option:selected').val()
          key = oldText ? self.levelIndex(oldText) + 1 : 0
          if (key >= self.numLevels()) key = self.numLevels() - 1
          newText = self.levelName(key)
          self.setSelect(newText)
          $('#previous-level-input').val(newText)
          break
        default:
          // Nothing
      }
    })
  }
}

module.exports = EventHandlers
