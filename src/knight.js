const Character = require('./character.js')

function Knight (startIndex) {
  Character.apply(this, ['knight', 'images/helmet_64px.png', startIndex, false])
  let self = this
  this.frequency = 2500 // Moves once per number of miliseconds
  this.interval = 0

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
Knight.prototype = new Character()

module.exports = Knight
