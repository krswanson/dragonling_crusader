function Character (id, image, startIndex, isPlayer) {
  this.id = id
  this.image = image
  this.startIndex = startIndex
  this.isPlayer = isPlayer
  this.invalidColors = []

  this.transformColor = function (color) {
    return color
  }

  this.addInvalidColor = function (color) {
    this.invalidColors.push(color)
  }

  this.validSpace = function (element) {
    return !this.invalidColors.includes(element.style.background)
  }
}

module.exports = Character
