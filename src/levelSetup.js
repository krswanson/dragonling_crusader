// Any hex colors must be in lowercase, such as #aabbcc
const Level = require('./level.js')
const Dragon = require('./dragon.js')

let levels = {}

let grass = '#44aa11'
let wetGrass = '#11aa55'
let dirt = '#995533'
let ice = '#aaccff'
let wizardry = '#eeee33'
let blackened = '#443322'

let fireGrass = {
  '#44aa11': 'orange',
  'orange': grass,
  '#11aa55': dirt,
  '#995533': 'orange',
  '#eeee33': blackened,
  '#443322': 'orange'
}
let fireDirt = Object.create(fireGrass)
fireDirt['orange'] = dirt

let iceWetGrass = {
  '#11aa55': ice,
  '#aaccff': wetGrass,
  '#44aa11': dirt,
  '#eeee33': dirt,
  '#995533': ice
}
let iceDirt = Object.create(iceWetGrass)
iceDirt['#aaccff'] = dirt

// let fireGrassDragon = new Dragon(fireGrass, 'orange', 'fire', '0_0', 'Fire Dragonling')
// let fireDirtDragon = new Dragon(fireDirt, 'orange', 'fire', '0_0', 'Fire Dragonling')

let lv = new Level()
lv.setMapColors(4, 4, grass, 'orange')
lv.addKnight(2, 2)
lv.addDragon('Fire Dragonling', 'fire', 'orange', fireGrass)
lv.description = 'Your dragonlings start their conquest on a grassy field.  This lands\' knights seem fond of it for some reason, so obviously you must take it away from them! Send this fire dragonling to take it over.'
levels['Level 1'] = lv

lv = new Level(lv)
lv.setMapColors(4, 4, wetGrass, 'orange')
lv.addKnight(2, 2)
lv.addDragon('Fire Dragonling', 'fire', 'orange', fireDirt)
lv.description = 'The enemy is has found a way to deter our progress. Looks like they have thrown water on this field. Might need to sear the grass down to dirt before the fire will take.'
levels['Level 2'] = lv

lv = new Level()
lv.setMapColors(4, 4, wetGrass, ice)
lv.addKnight(1, 1)
lv.addDragon('Ice Dragonling', 'ice', ice, iceWetGrass)
lv.description = 'Aha, new plan! Your ice dragonling reinforcements have arrived. It will be easy to freeze even a water-laden field.'
levels['Level 3'] = lv

lv = new Level()
lv.setMapColors(4, 4, wizardry, ice)
lv.addKnight(1, 1)
lv.addDragon('Ice Dragonling', 'ice', ice, iceDirt)
lv.goalColors[2][2] = 'gray'
lv.baseColors[2][2] = 'gray'
Object.keys(lv.characters).forEach(k => { lv.characters[k].addInvalidColor('gray') })
lv.description = 'Hmm, this field\'s grass looks strange.  Did they do something to it?  And what\'s up with the rock?'
levels['Level 4'] = lv

lv = new Level()
lv.setMapColors(5, 5, wizardry, ice)
lv.addKnight(2, 4)
lv.addKnight(4, 2)
lv.addDragon('Ice Dragonling', 'ice', ice, iceDirt)
lv.description = 'Two knights now! What are they defending? The castle is still a ways off.'
levels['Level 5'] = lv

lv = new Level()
lv.setMapColors(5, 5, grass, ice)
lv.addWizard(wizardry, 2, 2)
lv.addDragon('Ice Dragonling', 'ice', ice, iceDirt)
lv.baseColors[0][2] = wizardry
lv.baseColors[1][2] = wizardry
lv.description = 'Aha! This strangely-colored grass is a wizard\'s work!'
levels['Level 6'] = lv

lv = new Level()
lv.setMapColors(5, 5, grass, 'orange')
lv.addWizard(wizardry, 2, 2)
lv.getWizards()[0].percent = 0.3
let dragon = new Dragon(fireGrass, 'orange', 'fire', '0_0', 'Fire Dragonling')

let oldFunc = dragon.colorRelativeSquares
dragon.colorRelativeSquares = function (landingOnColor) {
  function blacken (color) { return blackened }
  if (landingOnColor === wizardry) {
    return { squares: [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]], transformColor: blacken }
  } else {
    return oldFunc(landingOnColor)
  }
}
lv.addCharacter(dragon)
lv.baseColors[3][2] = wizardry
lv.baseColors[4][2] = wizardry
lv.description = 'Let\'s see if fire is any better against this wizard\'s magic...'
levels['Level 7'] = lv

module.exports = levels
