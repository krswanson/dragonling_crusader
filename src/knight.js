const Character = require('./character.js')

function Knight (startIndex) {
  Character.apply(this, [
    'knight',
    ['images/helmet_colored_64px.png'],
    startIndex,
    false, // not player
    2200 // move frequency
  ])
  this.setStartFacing('left')
}
Knight.prototype = new Character()

module.exports = Knight
