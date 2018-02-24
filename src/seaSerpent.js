// A dragon of a certain color with color mappings
const Character = require('./character.js')
const hexColor = require('./hexColor.js')

function SeaSerpent (color, startIndex = '0_0') {
  // Image: #009944 #007733 #3377FF
  Character.apply(this, [
    'dragon',
    ['images/64px/sea_serpent', 'fore', 'back'],
    startIndex,
    true, // is player
    null // no move frequency
  ])
  let self = this
  this.color = color
  this.startIndexColor = color
  this.type = 'water'
  this.name = 'sea serpent'

  this.validSpace = function (element) {
    let elColor = hexColor(element.style.background)
    return (elColor === self.color || elColor === '')
  }
}
SeaSerpent.prototype = new Character()

module.exports = SeaSerpent
