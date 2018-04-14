// A dragon of a certain color with color mappings
const Character = require('./character.js')
const COLOR = require('../colors.js')

function Dragon (mapping, color, type, startIndex, name) {
  Character.apply(this, [
    'dragon',
    ['images/64px/dragon/' + type, 'fore', 'back'],
    startIndex,
    true, // is player
    null // no move frequency
  ])
  let self = this
  this.mapping = mapping
  this.color = color
  this.startIndexColor = color
  this.invalidColors = [COLOR.WALL]
  this.type = type
  this.name = name

  this.transformColor = function (color) {
    return this.mapping[color] || color
  }

  this.colorRelativeSquares = function (landingOnColor) {
    return { squares: [[0, 0]], transformColor: function () { return self.transformColor(landingOnColor) } }
  }
}
Dragon.prototype = new Character()

module.exports = Dragon
