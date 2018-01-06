const Character = require('./character.js')
const Arrow = require('./arrow.js')
const hexColor = require('./hexColor.js')

function Bow (startIndex,
              canFace = [[-1, -1], [1, -1], [1, 1], [-1, 1]],
              wallColor = 'gray') {
  Character.apply(this, [
    'bowman',
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

  this.validSpace = function (element) {
    let elColor = hexColor(element.style.background)
    return (elColor === self.wallColor || elColor === '')
  }

  // this.aim = function (newAim) {
  //   self.facing.set(newAim)
  //   self.setImage(['images/bow_' + self.facing.word + '_64px.png'])
  // }

  // this.setStartFacing = function (dir) {
  //   self.aim(dir)
  //   Bow.prototype.setStartFacing.call(this, dir)
  // }
}
Bow.prototype = new Character()

module.exports = Bow
