const Direction = require('./direction.js')
const hexColor = require('./hexColor.js')

function Character (id, image, startIndex, isPlayer, frequency) {
  let self = this
  this.id = id
  this.name = id
  this.image = null
  this.setImage = function (image) {
    this.image = (image && image.length === 1 ? [image[0], image[0]] : image)
  }
  this.setImage(image)
  this.startFacing = new Direction('right')
  this.facing = new Direction('right')
  this.setStartFacing = function (dir) {
    this.startFacing.set(dir)
    this.facing.set(dir)
  }
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
