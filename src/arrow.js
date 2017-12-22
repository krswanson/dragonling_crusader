const Character = require('./character.js')

function Arrow (startIndex) {
  Character.apply(this, [
    'arrow',
    ['images/arrow_64px.png'],
    startIndex,
    false, // not player
    1000 // move frequency
  ])

  this.movement = null // array like [-1, -1] for direction if moving
}
Arrow.prototype = new Character()

module.exports = Arrow
