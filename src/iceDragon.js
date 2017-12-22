const Dragon = require('./dragon.js')

function IceDragon (mapping, startIndex = '0_0') {
  Dragon.apply(this, [
    mapping,
    '#aaccff',
    'ice',
    startIndex,
    'Ice Dragonling'
  ])
}
IceDragon.prototype = new Dragon()

module.exports = IceDragon
