function Knight (startSquare) {
  this.frequency = 5000 // Moves once per number of miliseconds
  this.image = 'images/helmet_64px.png'
  this.id = 'knight'
  let myInterval = 0

  let move = function () {
    console.log('moving!')
  }

  this.moveNext = function () {
    if (myInterval > 0) clearInterval(myInterval)
    myInterval = setInterval(function () { move() }, this.frequency)
  }
}

module.exports = Knight
