const Character = require('./character.js')
const Arrow = require('./arrow.js')

function Bow (startIndex,
              canFace = [[-1, -1], [1, -1], [1, 1], [-1, 1]],
              wallColor = 'gray') {
  Character.apply(this, [
    'archer',
    ['images/64px/bow'],
    startIndex,
    false, // not player
    2000 // move frequency
  ])
  let self = this
  this.wallColor = wallColor
  this.setFacingOptions(canFace)
  this.setStartFacing('up_left')
  this.arrow = new Arrow(null)
  this.arrow.id = 'arrow_' + self.id
  this.arrow.setFacingOptions(canFace)

  this.setId = function (newId) {
    self.id = newId
    this.arrow.id = 'arrow_' + self.id
  }
}
Bow.prototype = new Character()

module.exports = Bow
