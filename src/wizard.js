const Character = require('./character.js')

function Wizard (color, startIndex) {
  Character.apply(this, ['wizard', ['images/wizard_64px.png', 'images/wizard_64px.png'], startIndex, false])
  let self = this
  this.color = color
  this.frequency = 2000 // Moves once per number of miliseconds
  this.baseFreq = 2000 // So that you can change the frequency based on a stable number
  this.interval = 0

  this.transformColor = function (color) {
    return (Math.random() < 0.5) ? self.color : color
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
Wizard.prototype = new Character()

module.exports = Wizard
