const setButtonType = require('./setButtonType.js')

function PlayerButtons () {
  this.setButtonType = setButtonType

  this.getButton = function (character) {
    return document.getElementsByClassName(character.type + '-player')[0]
  }

  this.displayButton = function (character, selected = true) {
    let b = document.createElement('BUTTON')
    b.className = 'player-button ' + character.type + '-player' + (selected ? ' selected' : '')
    setButtonType(b, character.type, selected)
    b.innerText = character.name
    b.value = character.id
    document.getElementById('player-buttons').appendChild(b)
  }

  this.displayPlayerButtons = function (characters) {
    characters
      .filter(c => { return c.isPlayer })
      .forEach((c, i) => {
        this.displayButton(c, i === 0)
      })
  }
}

module.exports = new PlayerButtons()
