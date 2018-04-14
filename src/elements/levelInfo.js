function LevelInfo () {
  function get (id) {
    return document.getElementById(id)
  }

  this.setEndgameDiv = function (message) {
    let endgame = get('endgame-message')
    endgame.style.display = 'block'
    endgame.innerHTML = message
  }

  this.set = function (description, objective = false, endgameDiv = false) {
    get('level-description').innerHTML = description
    let obj = get('level-objective')
    if (objective) {
      obj.parentNode.style.display = 'block'
      obj.innerHTML = objective
    } else {
      obj.parentNode.style.display = 'none'
    }
    if (endgameDiv) {
      this.setEndgameDiv(endgameDiv)
    } else {
      get('endgame-message').style.display = 'none'
    }
  }
}

module.exports = new LevelInfo()
