// A dragon of a certain color with color mappings
const Character = require('./character.js')

function Dragon (mapping, color, type, startColor = null) {
  Character.apply(this, ['dragon', 'images/dragon_64px.png', '0_0', true])
  this.mapping = mapping
  this.startColor = startColor || color // Color of starting square
  this.color = color
  this.type = type

  this.transformColor = function (color) {
    return this.mapping[color] || color
  }
}
Dragon.prototype = new Character()

module.exports = Dragon
