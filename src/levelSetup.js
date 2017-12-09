// Any hex colors must be in lowercase, such as #aabbcc
const Level = require('./level.js')

let levels = {}

let grass = '#44aa11'
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
    '#44aa11': 'brown',
    'brown': 'orange',
    'orange': 'brown'
  }
)
fire2.description = 'That wasn\'t so hard! Have your dragonling set this even grassy-er field on fire. You may need to burn the grass to the ground before it will catch properly.'
levels['fire_2'] = fire2

let fire3 = new Level()
let wetGrass = '#11aa55'
fire3.setMapColors(4, 4, wetGrass, 'orange')
fire3.addKnight(2, 1)
fire3.addDragon('fire', 'orange',
  {
    '#11aa55': 'brown',
    'brown': 'red',
    'red': 'orange',
    'orange': 'brown'
  }
)
fire3.description = 'The enemy is getting smarter. Looks like they have thrown water on this field. You may need to heat the ground to get all the water out. But you must take it to get to the castle!'
levels['fire_3'] = fire3

let ice = '#aaccff'
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
let ice2 = new Level()
ice2.setMapColors(4, 4, '#ddcc11', ice)
ice2.addKnight(1, 1)
ice2.addDragon('ice', ice,
  {
    '#ddcc11': 'brown',
    'brown': ice,
    '#aaccff': 'brown'
  }
)
ice2.goalColors[2][2] = 'gray'
ice2.baseColors[2][2] = 'gray'
Object.keys(ice2.characters).forEach(k => { ice2.characters[k].addInvalidColor('gray') })
ice2.description = 'Hmm, this field\'s grass looks strange.  Did they do something to it?  And what\'s up with the rock?'

levels['ice_2'] = ice2

module.exports = levels
