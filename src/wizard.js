const Character = require('./character.js')

function Wizard (color, startIndex) {
  Character.apply(this, [
    'wizard',
    ['images/wizard_yellow_left_64px.png'],
    startIndex,
    false, // not player
    2000 // move frequency
  ])

  let self = this
  this.setStartFacing('left')
  this.color = color
  this.startIndexColor = color
  this.percent = 0.5 // how often it changes the color of its space

  this.transformColor = function (color) {
    return (Math.random() < self.percent) ? self.color : color
  }
}
Wizard.prototype = new Character()

module.exports = Wizard
