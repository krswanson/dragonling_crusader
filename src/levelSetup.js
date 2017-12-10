// Any hex colors must be in lowercase, such as #aabbcc
const Level = require('./level.js')

let levels = {}

let grass = '#44aa11'
let wetGrass = '#11aa55'
let dirt = '#995533'
let ice = '#aaccff'
let wizardry = '#eeee33'

let fireLevel = new Level()
fireLevel.setMapColors(4, 4, grass, 'orange')
fireLevel.addKnight(2, 2)
fireLevel.addDragon('fire', 'orange',
  {
    '#44aa11': 'orange',
    'orange': grass
  }
)
fireLevel.description = 'Your dragonlings start their conquest on a grassy field.  This lands\' knights seem fond of it for some reason, so obviously you must take it away from them! Send this fire dragonling to take it over.'
levels['fire_1'] = fireLevel

let fire2 = new Level(fireLevel)
fire2.addKnight(2, 2)
fire2.addDragon('fire', 'orange',
  {
    '#44aa11': dirt,
    '#995533': 'orange',
    'orange': dirt
  }
)
fire2.description = 'That wasn\'t so hard! Have your dragonling set this even grassy-er field on fire. You may need to burn the grass to the ground before it will catch properly.'
levels['fire_2'] = fire2

let fire3 = new Level()
fire3.setMapColors(4, 4, wetGrass, 'orange')
fire3.addKnight(2, 1)
fire3.addDragon('fire', 'orange',
  {
    '#11aa55': dirt,
    '#995533': 'red',
    'red': 'orange',
    'orange': dirt
  }
)
fire3.description = 'The enemy is getting smarter. Looks like they have thrown water on this field. You may need to heat the ground to get all the water out. But you must take it to get to the castle!'
levels['fire_3'] = fire3

let iceLevel = new Level()
iceLevel.setMapColors(4, 4, wetGrass, ice)
iceLevel.addKnight(1, 1)
iceLevel.addDragon('ice', ice,
  {
    '#11aa55': ice,
    '#aaccff': wetGrass
  }
)
iceLevel.description = 'Aha, new plan! Your ice dragonling reinforcements have arrived. It will be easy to freeze even a water-laden field.'
levels['ice_1'] = iceLevel

let lv = new Level()
lv.setMapColors(4, 4, wizardry, ice)
lv.addKnight(1, 1)
lv.addDragon('ice', ice,
  {
    '#eeee33': dirt,
    '#995533': ice,
    '#aaccff': dirt
  }
)
lv.goalColors[2][2] = 'gray'
lv.baseColors[2][2] = 'gray'
Object.keys(lv.characters).forEach(k => { lv.characters[k].addInvalidColor('gray') })
lv.description = 'Hmm, this field\'s grass looks strange.  Did they do something to it?  And what\'s up with the rock?'
levels['ice_2'] = lv

lv = new Level()
lv.setMapColors(5, 5, wizardry, ice)
lv.addKnight(2, 4)
lv.addKnight(4, 2)
lv.addDragon('ice', ice,
  {
    '#eeee33': dirt,
    '#995533': ice,
    '#aaccff': dirt
  }
)
lv.description = 'Two knights now! What are they defending? The castle is still a ways off.'
levels['ice_3'] = lv

lv = new Level()
lv.setMapColors(5, 5, grass, ice)
lv.addWizard(wizardry, 2, 2)
lv.addDragon('ice', ice,
  {
    '#44aa11': dirt,
    '#995533': ice,
    '#aaccff': dirt,
    '#eeee33': dirt
  }
)
lv.baseColors[0][2] = wizardry
lv.baseColors[1][2] = wizardry
lv.description = 'Aha! This strangely-colored grass is a wizard\'s work!'
levels['ice_4'] = lv

module.exports = levels
