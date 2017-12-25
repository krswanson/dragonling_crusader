
// Any hex colors must be in lowercase, such as #aabbcc
const Direction = require('./direction.js')
const Level = require('./level.js')
const FireDragon = require('./fireDragon.js')
const IceDragon = require('./iceDragon.js')
const Bow = require('./bow.js')
let levels = {}

let grass = '#44aa11'
let wetGrass = '#11aa55'
let dirt = '#995533'
let fire = 'orange'
let ice = '#aaccff'
let water = '#1155dd'
let frozenWater = '#6699ee'
let wall = 'gray'
let wizardry = '#eeee33'
let blackened = '#443322'

let fireGrass = {
  '#44aa11': fire,
  'orange': dirt,
  '#11aa55': dirt,
  '#995533': fire,
  '#eeee33': blackened,
  '#443322': fire,
  '#1155dd': dirt,
  '#aaccff': water,
  '#6699ee': water
}
let fireDirt = Object.create(fireGrass)
fireDirt['orange'] = dirt

let iceWetGrass = {
  '#11aa55': ice,
  '#aaccff': dirt,
  '#44aa11': dirt,
  '#eeee33': dirt,
  '#995533': ice,
  '#1155DD': ice,
  'orange': water,
  '#1155dd': frozenWater,
  '#6699ee': water
}
let iceDirt = Object.create(iceWetGrass)
iceDirt['#aaccff'] = dirt

function setInvalidColor (chars, color) {
  Object.keys(chars).forEach(key => { chars[key].addInvalidColor(color) })
}

function setToColor (indexes, arr1, color1, arr2, color2) {
  indexes.forEach(i => {
    arr1[i[0]][i[1]] = color1
    if (arr2) arr2[i[0]][i[1]] = color2
  })
}

let lv = new Level()
lv.setMapColors(4, 4, grass, fire)
lv.addKnight(2, 2)
lv.addCharacter(new FireDragon(fireGrass))
lv.description = 'Your dragonlings start their conquest on a grassy field.  This lands\' knights seem fond of it for some reason, so obviously you must take it away from them! Send this fire dragonling to take it over.'
levels['Level 1'] = lv

lv = new Level(lv)
lv.setMapColors(4, 4, wetGrass, fire)
lv.addKnight(2, 2)
lv.addCharacter(new FireDragon(fireDirt))
lv.description = 'The enemy has found a way to deter your progress. Looks like they have thrown water on this field. Might need to sear the grass down to dirt before the fire will take.'
levels['Level 2'] = lv

lv = new Level()
lv.setMapColors(4, 4, wetGrass, ice)
let indexes = [[2, 0], [2, 1], [3, 1]]
setToColor(indexes, lv.baseColors, water, lv.goalColors, frozenWater)

lv.addKnight(1, 1)
setInvalidColor(lv.getKnights(), water)
lv.addCharacter(new IceDragon(iceWetGrass))
lv.description = 'Aha, new plan! Your ice dragonling reinforcements have arrived. It will be easy to freeze even a water-laden field. And hey, that\'s probably the river they got the water from!'
levels['Level 3'] = lv

lv = new Level()
lv.setMapColors(4, 4, wizardry, ice)
lv.addKnight(1, 1)
lv.addCharacter(new IceDragon(iceDirt))
lv.goalColors[2][2] = wall
lv.baseColors[2][2] = wall
setInvalidColor(lv.characters, wall)
lv.description = 'Hmm, this field\'s grass looks strange. Did they do something to it? And is that an abondoned watchtower?'
levels['Level 4'] = lv

lv = new Level()
lv.setMapColors(5, 5, wizardry, ice)
lv.addKnight(2, 4)
lv.addKnight(4, 2)
lv.addCharacter(new IceDragon(iceDirt))
lv.description = 'Two knights now! What are they defending? The castle is still a ways off.'
levels['Level 5'] = lv

lv = new Level()
lv.setMapColors(5, 5, grass, ice)
lv.addWizard(wizardry, 2, 2)
lv.addCharacter(new IceDragon(iceDirt))
lv.baseColors[0][2] = wizardry
lv.baseColors[1][2] = wizardry
lv.description = 'Aha! This strangely-colored grass is a wizard\'s work!'
levels['Level 6'] = lv

lv = new Level()
lv.setMapColors(5, 5, grass, fire)
lv.addWizard(wizardry, 2, 2)
lv.getWizards()[0].percent = 0.3
let dragon = new FireDragon(fireGrass)

let oldFunc = dragon.colorRelativeSquares
dragon.colorRelativeSquares = function (landingOnColor) {
  function blacken (color) { return blackened }
  if (landingOnColor === wizardry) {
    return { squares: [new Direction([0, 0]), new Direction('up'), new Direction('right'), new Direction('down'), new Direction('left')], transformColor: blacken }
  } else {
    return oldFunc(landingOnColor)
  }
}
lv.addCharacter(dragon)
lv.baseColors[3][2] = wizardry
lv.baseColors[4][2] = wizardry
lv.description = 'Okay, send in the fire dragonling this time to see if fire is any better against this wizard\'s magic...'
levels['Level 7'] = lv

lv = new Level()
lv.setMapColors(5, 6, grass, fire)
indexes = [[3, 3], [3, 4], [3, 5], [4, 3]]
setToColor(indexes, lv.baseColors, wall, lv.goalColors, null)
indexes = [[4, 4], [4, 5]]
setToColor(indexes, lv.baseColors, dirt, lv.goalColors, null)
indexes = [[4, 2], [3, 2], [2, 2], [2, 3], [2, 4], [2, 5]]
setToColor(indexes, lv.baseColors, water, lv.goalColors, null)

lv.addKnight(1, 3)
lv.getKnights()[0].addInvalidColor(water)
lv.addCharacter(new Bow('3_3', ['upLeft', 'upRight', 'downLeft']))
lv.addCharacter(new Bow('3_4', ['upLeft', 'upRight']))
lv.addCharacter(new Bow('3_5', ['upLeft']))
lv.addCharacter(new Bow('4_3', ['upLeft']))
lv.addCharacter(new FireDragon(fireGrass))
lv.description = 'You\'ve reached the castle at last! Hmm, but if they have bowman on the walls like this you are going to need something other than dragonlings... May as well set the surrounding crops on fire while you\'re here though.'
levels['Level 8'] = lv

lv = new Level()
lv.setMapColors(5, 7, grass, ice)
lv.addCharacter(new IceDragon(iceDirt))
let fd = new FireDragon(fireGrass)
fd.startIndex = '0_6'
lv.addCharacter(fd)
lv.description = ''
levels['Level 9'] = lv

module.exports = levels
