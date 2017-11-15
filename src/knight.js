const Character = require('./character.js')

function Knight () {
  Character.apply(this, ['knight', 'images/helmet_64px.png'])
  this.frequency = 5000 // Moves once per number of miliseconds
  let myInterval = 0

  let move = function () {
    console.log('moving!')
  }

  this.moveNext = function () {
    if (myInterval > 0) clearInterval(myInterval)
    myInterval = setInterval(function () { move() }, this.frequency)
  }
}
Knight.prototype = new Character()

module.exports = Knight
