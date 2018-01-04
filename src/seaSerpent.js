// A dragon of a certain color with color mappings
const Character = require('./character.js')
const hexColor = require('./hexColor.js')

function SeaSerpent (color, startIndex) {
  Character.apply(this, [
    'dragon',
    ['images/sea_serpent_64px.png', 'images/sea_serpent_64px.png'],
    startIndex,
    true, // is player
    null // no move frequency
  ])
  let self = this
  this.color = color
  this.startIndexColor = color
  this.type = 'water'
  this.name = 'Sea Serpent'

  this.validSpace = function (element) {
    let elColor = hexColor(element.style.background)
    console.log(elColor, self.color)
    return (elColor === self.color || elColor === '')
  }
}
SeaSerpent.prototype = new Character()

module.exports = SeaSerpent
