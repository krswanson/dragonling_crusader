const Character = require('./character.js')

function Arrow (startIndex) {
  Character.apply(this, [
    'arrow',
    ['images/64px/arrow'],
    startIndex,
    false, // not player
    1000 // move frequency
  ])
  let self = this
  this.moving = false

  // this.aim = function (newAim) {
  //   self.facing.set(newAim)
  //   self.setImage(['images/arrow_' + self.facing.word + '_64px.png'])
  // }

  this.stopMoving = function () {
    self.moving = false
    Arrow.prototype.stopMoving.call(self)
  }
}
Arrow.prototype = new Character()

module.exports = Arrow
