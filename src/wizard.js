const Character = require('./character.js')
const COLOR = require('./colors.js')

function Wizard (color, startIndex) {
  Character.apply(this, [
    'wizard',
    ['images/64px/wizard'],
    startIndex,
    false, // not player
    2000 // move frequency
  ])

  let self = this
  this.color = color
  this.startIndexColor = color
  this.invalidColors = [COLOR.WATER, COLOR.WALL]
  this.percent = 0.5 // how often it changes the color of its space

  this.transformColor = function (color) {
    return (Math.random() < self.percent) ? self.color : color
  }
}
Wizard.prototype = new Character()

module.exports = Wizard
