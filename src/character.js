const Direction = require('./direction.js')
const hexColor = require('./hexColor.js')
const Images = require('./images.js')

function Character (id, imagePaths, startIndex, isPlayer, frequency) {
  if (!imagePaths) imagePaths = new Array(3)
  let self = this
  this.id = id
  this.name = id
  this.images = new Images(imagePaths[0] || '', imagePaths[1] || '', imagePaths[2] || '')
  this.startFacing = new Direction(isPlayer ? 'right' : 'left')
  this.facingOptions = [new Direction('right'), new Direction('left')]
  this.facing = new Direction(self.startFacing)
  this.startIndex = startIndex
  this.isPlayer = isPlayer
  this.invalidColors = []
  this.frequency = frequency // Moves once per number of miliseconds
  this.baseFreq = frequency // So that you can change the frequency based on a stable number
  this.interval = 0

  this.setId = function (newId) {
    this.id = newId
  }

  this.transformColor = function (color) {
    return color
  }

  this.colorRelativeSquares = function (landingOnColor) {
    return { squares: [new Direction([0, 0])], transformColor: function () { return self.transformColor(landingOnColor) } }
  }

  this.addInvalidColor = function (color) {
    this.invalidColors.push(color)
  }

  this.validSpace = function (element) {
    return !this.invalidColors.includes(hexColor(element.style.background))
  }

  this.setStartFacing = function (dir) {
    this.startFacing.set(dir)
    this.facing.set(dir)
  }

  this.setFacingOptions = function (options) {
    self.facingOptions = []
    options.forEach(d => {
      self.facingOptions.push(new Direction(d))
    })
  }

  this.canFace = function (dir) {
    let word = Direction.makeWord(dir)
    return self.facingOptions.find(f => {
      return word === f.word
    })
  }

  this.face = function (newDir, override = false) {
    if (!override && !this.canFace(newDir)) return false
    self.facing.set(newDir)
    return true
  }

  this.getForeImage = function () {
    return self.images.getFore(self.facing.word)
  }

  this.getBackImage = function () {
    return self.images.getBack(self.facing.word)
  }

  this.move = function () {}

  this.startMoving = function (moveFunc) {
    this.move = moveFunc
    this.setFrequency(this.frequency)
  }
  this.stopMoving = function () {
    this.move = function () {}
    clearInterval(this.interval)
  }

  this.setFrequency = function (frequency) {
    this.frequency = frequency
    if (this.interval > 0) clearInterval(self.interval)
    this.interval = setInterval(function () { self.move() }, self.frequency)
  }
}

module.exports = Character
