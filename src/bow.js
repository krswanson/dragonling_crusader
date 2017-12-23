const Character = require('./character.js')
const Arrow = require('./arrow.js')

function Bow (startIndex,
              canFace = [[-1, -1], [1, -1], [1, 1], [-1, 1]],
              wallColor = 'gray') {
  let facing = 'upLeft'
  Character.apply(this, [
    'bowman',
    ['images/bow_' + facing + '_64px.png'],
    startIndex,
    false, // not player
    2000 // move frequency
  ])
  let self = this
  this.wallColor = wallColor
  this.canFace = canFace
  this.arrow = new Arrow(null)
  this.arrow.id = 'arrow_' + self.id

  this.setId = function (newId) {
    self.id = newId
    this.arrow.id = 'arrow_' + self.id
  }

  this.validSpace = function (element) {
    let elColor = element.style.background
    return (elColor === self.wallColor || elColor === '')
  }

  this.aim = function (newAim) {
    self.facing.set(newAim)
    self.setImage(['images/bow_' + self.facing.word + '_64px.png'])
  }

  this.setStartFacing = function (dir) {
    self.aim(dir)
    Bow.prototype.setStartFacing.call(this, dir)
  }

  this.setStartFacing(facing)
}
Bow.prototype = new Character()

module.exports = Bow
