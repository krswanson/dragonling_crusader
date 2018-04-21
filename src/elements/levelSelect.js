  /* global $ */

function levelSelect (game) {
  let self = this
  this.closed = true
  this.game = game

  let isPhone = window.matchMedia('only screen and (max-width: 786px)').matches
  if (isPhone) {
    document.getElementById('previous-level-input').placeholder = 'Level 1'
  }

  // From: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
  let isIE = !!document.documentMode

  // Edge 20+
  let isEdge = !isIE && !!window.StyleMedia

  // Firefox 1.0+
  let isFirefox = typeof InstallTrigger !== 'undefined'

  if (isEdge || isFirefox) {
    let select = document.getElementById('level-select')
    select.style.position = 'relative'
    if (isFirefox) select.style.marginTop = '-20px'
  }

  this.clearSelect = function () {
    $('#previous-level-div .error-message').text('')
    $('#previous-level-input').val('')
    $('#level-select').val('')
  }

  this.setupLevel = function (name, restart = false) {
    self.clearSelect()
    self.game.selectLevel(name)
    document.getElementById('start-level').style.display = restart ? 'none' : 'inline-block'
    document.getElementById('restart-level').style.display = 'none'
    let screen = document.getElementById('board-screen')
    screen.style.display = 'block'
    screen.style.height = (game.board.rows * (window.matchMedia('only screen and (max-width: 768px)').matches ? 45 : 83) + 30) + 'px'
  }

  this.startLevel = function (name) {
    self.clearSelect()
    document.getElementById('board-screen').style.display = 'none'
    document.querySelectorAll('#level-content .level-button')
      .forEach(b => { b.style.display = 'none' })
    self.game.startLevel(name)
  }

  this.setupLevelOption = function (lv) {
    let comLv = window.sessionStorage.getItem('level-completed')
    let container = document.getElementById('previous-level-div')
    if (!comLv) { // No levels completed yet
      container.style.display = 'none'
    } else if (game.levelIndex(comLv) >= game.levelIndex(lv)) {
      let select = document.getElementById('level-select')
      let option = document.createElement('OPTION')
      container.style.display = 'block'
      option.value = lv
      option.innerHTML = lv
      option.addEventListener('click', function () {
        if (window.sessionStorage.getItem('level-completed')) {
          self.setSelect(this.value)
          self.closed = !self.closed
        }
      })
      select.value = lv
      select.size++
      select.appendChild(option)
      if (select.size <= 6) {
        select.style.height = (34 * (select.size - 1)) + 'px'
        select.style.overflow = 'hidden'
      } else {
        select.style.overflow = ''
        select.style.height = 34 * 5
      }
    }
  }

  this.inputClick = function (input) {
    if (window.sessionStorage.getItem('level-completed')) {
      self.closed = !self.closed
      $('#level-select').slideToggle(isFirefox ? 0 : 320)
    }
  }

  function updateSelectText (element) {
    $(element).hide().closest('div').find('input').val($(element).find('option:selected').text())
  }

  this.changeInputText = function (direction) {
    let oldText = $('#level-select').find('option:selected').val()
    let newIndex = game.levelIndex(oldText) + (direction === 'back' ? -1 : 1)
    let key = oldText ? newIndex : 0
    if (key < 0) key = 0
    if (key >= game.numLevels()) key = game.numLevels() - 1
    let max = window.sessionStorage.getItem('level-completed')
    if (!max || key > game.levelIndex(max)) return
    let newText = game.levelName(key)
    self.setSelect(newText)
    $('#previous-level-input').val(newText)
  }

  this.setSelect = function (levelKey) {
    $('#level-select')[0].value = levelKey
    $('option[value="' + levelKey + '"]', document)
    .attr('selected', true).siblings()
    .removeAttr('selected')
  }

  this.clickSubmit = function () {
    let inputBox = $('#previous-level-input')
    if (!self.closed) self.inputClick(inputBox)
    let newText = inputBox.val()
    if (self.game.levelIndex(newText) >= 0) self.setSelect(newText)
    document.getElementById('level-select-button').click()
  }

  this.setup = function () {
    self.game.levelKeys().forEach(function (lv) {
      self.setupLevelOption(lv)
    })

    document.getElementById('level-select').addEventListener('click', function () {
      updateSelectText(this)
    })

    document.getElementById('level-select-button').addEventListener('click', function () {
      function respondToBadInput (message) {
        $('#previous-level-div .error-message').text(message)
      }
      if (!self.closed) self.inputClick('#previous-level-input')
      let input = $('#previous-level-input')[0].value || $('#level-select')[0].value
      if (self.game.validLevel(input)) {
        let lvComId = self.game.levelIndex(window.sessionStorage.getItem('level-completed'))
        let inputLvId = game.levelIndex(input)
        if (lvComId < inputLvId) {
          return respondToBadInput('Have not beaten selected level')
        }
        self.setupLevel(input)
      } else {
        let message = input === '' ? 'No level selected' : 'Invalid level name'
        respondToBadInput(message)
      }
    })

    let prevLevelInput = document.getElementById('previous-level-input')
    prevLevelInput.addEventListener('click', function () {
      self.inputClick(this)
    })
  }
}

module.exports = levelSelect
