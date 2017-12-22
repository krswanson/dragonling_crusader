function Character (id, image, startIndex, isPlayer, frequency) {
  let self = this
  this.id = id
  this.image = (image && image.length === 1 ? [image[0], image[0]] : image)
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
    return { squares: [[0, 0]], transformColor: function () { return self.transformColor(landingOnColor) } }
  }

  this.addInvalidColor = function (color) {
    this.invalidColors.push(color)
  }

  this.validSpace = function (element) {
    return !this.invalidColors.includes(element.style.background)
  }

  this.move = function () {}

  this.startMoving = function (moveFunc) {
    self.move = moveFunc
    self.setFrequency(self.frequency)
  }
  this.stopMoving = function () {
    self.move = function () {}
    clearInterval(self.interval)
  }

  this.setFrequency = function (frequency) {
    self.frequency = frequency
    if (self.interval > 0) clearInterval(self.interval)
    self.interval = setInterval(function () { self.move() }, self.frequency)
  }
}

module.exports = Character
