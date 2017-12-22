const Character = require('./character.js')
const Arrow = require('./arrow2.js')

function Bow (startIndex, wallColor = 'gray') {
  Character.apply(this, [
    'bowman',
    ['images/bow_64px.png'],
    startIndex,
    false, // not player
    2000 // move frequency
  ])
  let self = this
  this.wallColor = wallColor
  this.arrow = new Arrow(startIndex)
  this.arrow.id = 'arrow_' + self.id

  this.setId = function (newId) {
    self.id = newId
    this.arrow.id = 'arrow_' + self.id
  }

  this.validSpace = function (element) {
    console.log('element', element.style.background, 'self.wallColor', self.wallColor)
    return element.style.background === self.wallColor
  }
}
Bow.prototype = new Character()

module.exports = Bow
