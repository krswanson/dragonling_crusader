const Character = require('./character.js')
const COLOR = require('./colors.js')

function Knight (startIndex) {
  Character.apply(this, [
    'knight',
    ['images/64px/knight'],
    startIndex,
    false, // not player
    2200 // move frequency
  ])
  this.invalidColors = [COLOR.WATER, COLOR.WALL]
}
Knight.prototype = new Character()

module.exports = Knight
