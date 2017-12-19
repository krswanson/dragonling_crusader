function Character (id, image, startIndex, isPlayer) {
  let self = this
  this.id = id
  this.image = image
  this.startIndex = startIndex
  this.isPlayer = isPlayer
  this.invalidColors = []

  this.transformColor = function (color) {
    return color
  }

  this.colorRelativeSquares = function (landingOnColor) {
    return { squares: [[0, 0]], transformColor: function () { return self.transformColor(landingOnColor) } }
  }

  this.addInvalidColor = function (color) {
    this.invalidColors.push(color)
  }

  this.validSpace = function (element) {
    return !this.invalidColors.includes(element.style.background)
  }
}

module.exports = Character
