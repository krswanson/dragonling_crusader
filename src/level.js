let Dragon = require('./dragon.js')
let Knight = require('./knight.js')

function Level (lv = {}) {
  let self = this
  this.baseColors = lv.baseColors ? lv.baseColors.map(arr => { return arr.slice() }) : [['']]
  this.goalColors = lv.goalColors ? lv.goalColors.map(arr => { return arr.slice() }) : [['']]
  this.characters = {}
  this.description = lv.description || ''

  this.filledArray = function (color, rows, cols) {
    let arr2d = []
    for (let i = 0; i < rows; i++) {
      let arr = new Array(cols)
      arr.fill(color)
      arr2d.push(arr)
    }
    return arr2d
  }

  this.setMapColors = function (rows, cols, baseColor, goalColor) {
    self.baseColors = this.filledArray(baseColor, rows, cols)
    self.goalColors = this.filledArray(goalColor, rows, cols)
  }

  this.addCharacter = function (character) {
    let ids = Object.keys(self.characters).filter(id => { return id.includes(character.id) })
    character.id += '_' + (ids.length + 1)
    self.characters[character.id] = character
  }

  this.addDragon = function (type, color, mapping, row = 0, col = 0) {
    let dragon = new Dragon(mapping, color, type, row + '_' + col)
    self.addCharacter(dragon)
    self.baseColors[row][col] = color
  }

  this.addKnight = function (row, col) {
    let knight = new Knight(row + '_' + col)
    self.addCharacter(knight)
  }
}

module.exports = Level