let color = require('./colors.js')

// From: https://stackoverflow.com/questions/15071062/using-javascript-to-edit-css-gradient
function getCssValuePrefix () {
  let prefix = '' // default to standard syntax
  let prefixes = ['', '-webkit-', '-khtml-', '-moz-', '-ms-', '-o-']

  // Create a temporary DOM object for testing
  let dom = document.createElement('div')

  for (let i = 0; i < prefixes.length; i++) {
    // Attempt to set the style
    dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)'

    // Detect if the style was successfully set
    if (dom.style.background) {
      prefix = prefixes[i]
      break
    }
  }

  return prefix
}

function setButton (button, colorTop, colorBottom) {
  // Setting the gradient with the proper prefix
  let prefix = getCssValuePrefix()
  let orientation = (prefix === '') ? 'to bottom' : 'top'
  button.style.backgroundImage = prefix + 'linear-gradient(' +
    orientation + ', ' + colorTop + ', ' + colorBottom + ')'
}

function setButtonType (button, type, selected) {
  let types = new Array(2)
  switch (type) {
    case 'fire':
      types = [color.FIRE, '#443300']
      break
    case 'ice':
      types = [color.ICE, '#223344']
      break
    case 'water':
      // square is set to: '#1155dd'
      types = ['#3377FF', '#11224A']
      break
    default:
      console.error('Bad player-type keyword:', type)
  }
  let top = selected ? types[1] : types[0]
  let bottom = selected ? types[0] : types[1]
  setButton(button, top, bottom)
}

module.exports = setButtonType
