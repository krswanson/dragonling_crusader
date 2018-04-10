
// Any hex colors must be in lowercase, such as #aabbcc
const color = require('./colors.js')
const Direction = require('./direction.js')
const Level = require('./level.js')
const FireDragon = require('./fireDragon.js')
const IceDragon = require('./iceDragon.js')
const Bow = require('./bow.js')
let levels = {}

let fireMapping = {
  '#44aa11': color.FIRE,
  'orange': color.DIRT,
  '#11aa55': color.DIRT,
  '#995533': color.FIRE,
  '#eeee33': color.BLACKENED,
  '#443322': color.FIRE,
  '#1155dd': color.DIRT,
  '#aaccff': color.WATER,
  '#6699ee': color.WATER
}

let iceMapping = {
  '#11aa55': color.ICE,
  '#aaccff': color.DIRT,
  '#44aa11': color.DIRT,
  '#eeee33': color.DIRT,
  '#995533': color.ICE,
  '#1155DD': color.ICE,
  'orange': color.WATER,
  '#1155dd': color.FROZEN_WATER,
  '#6699ee': color.WATER
}

let lv = new Level()
lv.setMapColors(4, 4, color.GRASS, color.FIRE)
lv.addKnight(2, 2)
lv.addCharacter(new FireDragon(fireMapping))
lv.description = 'Your dragonlings start their conquest on a grassy field.  This lands\' knights seem fond of it for some reason, so obviously you must take it away from them! Send this fire dragonling to take it over.'
levels['Level 1'] = lv

lv = new Level(lv)
lv.setMapColors(4, 4, color.WET_GRASS, color.FIRE)
lv.addKnight(2, 2)
lv.addCharacter(new FireDragon(fireMapping))
lv.description = 'The enemy has found a way to deter your progress. Looks like they have thrown water on this field. Might need to sear the grass down to dirt before the fire will take.'
levels['Level 2'] = lv

lv = new Level()
lv.setMapColors(4, 4, color.WET_GRASS, color.ICE)
let indexes = [[2, 0], [2, 1], [3, 1]]
lv.setIndexesColors(indexes, color.WATER, color.FROZEN_WATER)

lv.addKnight(1, 1)
lv.addCharacter(new IceDragon(iceMapping))
lv.description = 'Aha, new plan! Your ice dragonling reinforcements have arrived. It will be easy to freeze even a water-laden field. And hey, that\'s probably the river they got the water from!'
levels['Level 3'] = lv

lv = new Level()
lv.setMapColors(4, 4, color.WIZARDRY, color.ICE)
lv.addKnight(1, 1)
lv.addCharacter(new IceDragon(iceMapping))
lv.setIndexesColors([[2, 2]], color.WALL, color.WALL)
lv.description = 'Hmm, this field\'s grass looks strange. Did they do something to it? And is that an abondoned watchtower?'
levels['Level 4'] = lv

lv = new Level()
lv.setMapColors(5, 5, color.WIZARDRY, color.ICE)
lv.addKnight(2, 4)
lv.addKnight(4, 2)
lv.addCharacter(new IceDragon(iceMapping))
lv.description = 'Two knights now! What are they defending? The castle is still a ways off.'
levels['Level 5'] = lv

lv = new Level()
lv.setMapColors(5, 5, color.GRASS, color.ICE)
lv.addWizard(color.WIZARDRY, 2, 2)
lv.addCharacter(new IceDragon(iceMapping))
lv.setBaseColor(0, 2, color.WIZARDRY)
lv.setBaseColor(1, 2, color.WIZARDRY)
lv.description = 'Aha! This strangely-colored grass is a wizard\'s work!'
levels['Level 6'] = lv

lv = new Level()
lv.setMapColors(5, 5, color.GRASS, color.FIRE)
lv.addWizard(color.WIZARDRY, 2, 2)
lv.getWizards()[0].percent = 0.3
let dragon = new FireDragon(fireMapping)

let oldFunc = dragon.colorRelativeSquares
dragon.colorRelativeSquares = function (landingOnColor) {
  let blackened = color.BLACKENED
  function blacken (color) { return blackened }
  if (landingOnColor === color.WIZARDRY) {
    return { squares: [new Direction([0, 0]), new Direction('up'), new Direction('right'), new Direction('down'), new Direction('left')], transformColor: blacken }
  } else {
    return oldFunc(landingOnColor)
  }
}
lv.addCharacter(dragon)
lv.setBaseColor(3, 2, color.WIZARDRY)
lv.setBaseColor(4, 2, color.WIZARDRY)
lv.description = 'Okay, send in the fire dragonling this time to see if fire is any better against this wizard\'s magic...'
levels['Level 7'] = lv

lv = new Level()
lv.setMapColors(5, 6, color.GRASS, color.FIRE)
indexes = [[3, 3], [3, 4], [3, 5], [4, 3]]
lv.setIndexesColors(indexes, color.WALL, color.WALL)
indexes = [[4, 4], [4, 5]]
lv.setIndexesColors(indexes, color.DIRT, color.DIRT)
indexes = [[4, 2], [3, 2], [2, 2], [2, 3], [2, 4], [2, 5]]
lv.setIndexesColors(indexes, color.WATER, null)

lv.addKnight(1, 3)
lv.getKnights()[0].addInvalidColor(color.WATER)
lv.addCharacter(new Bow('3_3', ['up_left', 'up_right', 'down_left']))
lv.addCharacter(new Bow('3_4', ['up_left', 'up_right']))
lv.addCharacter(new Bow('3_5', ['up_left']))
lv.addCharacter(new Bow('4_3', ['up_left']))
lv.addCharacter(new FireDragon(fireMapping))
lv.description = 'You\'ve reached the castle at last! Hmm, but if they have bowman on the walls like this you are going to need something other than dragonlings... May as well set the surrounding crops on fire while you\'re here though.'
levels['Level 8'] = lv

const SeaSerpent = require('./seaSerpent.js')

lv = new Level()
lv.setMapColors(5, 7, color.GRASS, null)
lv.addKnight(2, 3)
lv.addCharacter(new FireDragon(fireMapping, '4_4'))
lv.addCharacter(new IceDragon(iceMapping, '0_1'))
lv.addCharacter(new SeaSerpent(color.WATER, '0_0'))
lv.setIndexesColors([[1, 0]], color.WATER, null)
lv.setGoalChar(4, 6, lv.getDragons()[2])
lv.description = 'Excellent, here is your ally the sea serpent. The castle is to the bottom right. Get him down there and he will be able to help deal with the archers!'
levels['Level 9'] = lv

lv = new Level()
lv.setMapColors(6, 6, color.GRASS, null)
indexes = [[4, 0], [4, 1], [4, 4], [4, 5]]
lv.setIndexesColors(indexes, color.WALL, color.WALL)
indexes = [[4, 2], [4, 3], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]]
lv.setIndexesColors(indexes, color.DIRT, color.FIRE)
indexes = [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]]
lv.setIndexesColors(indexes, color.WATER, null)
lv.addCharacter(new Bow('4_0', ['up_right']))
lv.addCharacter(new Bow('4_2', ['up_left', 'up_right']))
lv.addCharacter(new Bow('4_3', ['up_left', 'up_right']))
lv.addCharacter(new Bow('4_5', ['up_left']))
lv.getCharacters()
  .filter(c => { return !c.id.includes('arrow') })
  .forEach((c, i) => {
    c.setFrequency(Math.random() * c.baseFreq + c.baseFreq)
    if (i % 2 === 0) c.setStartFacing('up_right')
  })
lv.addCharacter(new FireDragon(fireMapping, '1_0'))
lv.addCharacter(new IceDragon(iceMapping, '0_1'))
lv.addCharacter(new SeaSerpent(color.WATER, '0_0'))
lv.description = 'Back at the castle! You will need to get your fire dragonling inside. Now, in order to deal with the archers, we need to get the sea serpent close to the walls...'
levels['Level 10'] = lv

module.exports = levels
