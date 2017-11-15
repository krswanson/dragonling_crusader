function Character (id, image, startIndex) {
  this.id = id
  this.image = image
  this.startIndex = startIndex

  this.transformColor = function (color) {
    return color
  }
}

module.exports = Character
