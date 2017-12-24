const rgbHex = require('rgb-hex')

function hexColor (color) {
  return color.includes('rgb') ? '#' + rgbHex(color) : color
}

module.exports = hexColor
