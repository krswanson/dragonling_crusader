const Character = require('./character.js')

function Knight (startIndex) {
  Character.apply(this, [
    'knight',
    ['images/64px/knight'],
    startIndex,
    false, // not player
    2200 // move frequency
  ])
}
Knight.prototype = new Character()

module.exports = Knight
