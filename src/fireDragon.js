const Dragon = require('./dragon.js')

function FireDragon (mapping, startIndex = '0_0') {
  Dragon.apply(this, [
    mapping,
    'orange',
    'fire',
    startIndex,
    'fire dragonling'
  ])
}
FireDragon.prototype = new Dragon()

module.exports = FireDragon
