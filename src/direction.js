function Direction (d) {
  let self = this
  this.x = null
  this.y = null
  this.word = ''
  this.keywords = [['upLeft', 'up', 'upRight'],
    ['left', 'none', 'right'],
    ['downLeft', 'down', 'downRight']]

  this.convertToWord = function (vector) {
    return self.keywords[vector[0] + 1][vector[1] + 1]
  }

  this.convertToVector = function (word) {
    for (let i = 0; i < self.keywords.length; i++) {
      for (let j = 0; j < self.keywords[i].length; j++) {
        if (self.keywords[i][j] === word) return [i - 1, j - 1]
      }
    }
    console.error('Bad direction keyword:', word)
    return []
  }

  this.vector = function () {
    return [self.x, self.y]
  }

  this.set = function (direction) {
    if (typeof direction === 'string') {
      self.word = direction
      let vector = self.convertToVector(direction)
      self.x = vector[0]
      self.y = vector[1]
    } else if (Array.isArray(direction)) {
      self.x = direction[0]
      self.y = direction[1]
      self.word = self.convertToWord(direction)
    }
  }
  this.set(d)
}

module.exports = Direction
