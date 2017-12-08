// A dragon of a certain color with color mappings
const Character = require('./character.js')

function Dragon (mapping, color, type, startIndex) {
  Character.apply(this, ['dragon', 'images/dragon_64px.png', startIndex, true])
  this.mapping = mapping
  this.color = color
  this.type = type

  this.transformColor = function (color) {
    return this.mapping[color] || color
  }
}
Dragon.prototype = new Character()

module.exports = Dragon
