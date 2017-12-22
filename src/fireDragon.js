const Dragon = require('./dragon.js')

function FireDragon (mapping, startIndex = '0_0') {
  Dragon.apply(this, [
    mapping,
    'orange',
    'fire',
    startIndex,
    'Fire Dragonling'
  ])
}
FireDragon.prototype = new Dragon()

module.exports = FireDragon
