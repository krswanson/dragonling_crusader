const keywords = [['up_left', 'up', 'up_right'],
    ['left', 'none', 'right'],
    ['down_left', 'down', 'down_right']]

function convertToWord (vector) {
  if (!Array.isArray(vector) || vector.length !== 2) return console.error('Bad vector:', vector)
  return keywords[1 - vector[1]][vector[0] + 1]
}

function convertToVector (word) {
  for (let i = 0; i < keywords.length; i++) {
    for (let j = 0; j < keywords[i].length; j++) {
      if (keywords[i][j] === word) return [j - 1, 1 - i]
    }
  }
  console.error('Bad direction keyword:', word)
  return []
}

function makeWord (direction) {
  if (direction.constructor.name === 'Direction') return direction.word
  else if (Array.isArray(direction) && direction.length === 2) convertToWord(direction)
  else if (typeof direction === 'string') {
    let good = keywords.find(arr => { return arr.includes(direction) })
    if (good) return direction

    console.error('Bad direction keyword:', direction)
    return ''
  }

  console.error('Could not make direction keyword from:', direction)
  return ''
}

function makeVector (direction) {
  if (direction.constructor.name === 'Direction') return direction.vector()
  else if (Array.isArray(direction) && direction.length === 2) return direction
  else if (typeof direction === 'string') return convertToVector(direction)

  console.error('Could not make vector from direction:', direction)
  return []
}

function Direction (d) {
  let self = this
  this.x = null
  this.y = null
  this.word = ''

  this.vector = function () {
    return [self.x, self.y]
  }

  this.set = function (direction) {
    if (direction.constructor.name === 'Direction') {
      self.word = direction.word
      self.x = direction.x
      self.y = direction.y
    } else if (typeof direction === 'string') {
      self.word = direction
      let vector = convertToVector(direction)
      self.x = vector[0]
      self.y = vector[1]
    } else if (Array.isArray(direction) && direction.length === 2) {
      self.x = direction[0]
      self.y = direction[1]
      self.word = convertToWord(direction)
    } else {
      console.error('Could not create Direction from direction:', direction)
    }
  }

  this.set(d)
}

Direction.keywords = keywords
Direction.convertToWord = convertToWord
Direction.convertToVector = convertToVector
Direction.makeWord = makeWord
Direction.makeVector = makeVector

module.exports = Direction
