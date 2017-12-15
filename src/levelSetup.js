// Any hex colors must be in lowercase, such as #aabbcc
const Level = require('./level.js')

let levels = {}

let grass = '#44aa11'
let wetGrass = '#11aa55'
let dirt = '#995533'
let ice = '#aaccff'
let wizardry = '#eeee33'

let lv = new Level()
lv.setMapColors(4, 4, grass, 'orange')
lv.addKnight(2, 2)
lv.addDragon('Fire Dragonling', 'fire', 'orange',
  {
    '#44aa11': 'orange',
    'orange': grass
  }
)
lv.description = 'Your dragonlings start their conquest on a grassy field.  This lands\' knights seem fond of it for some reason, so obviously you must take it away from them! Send this fire dragonling to take it over.'
levels['Level 1'] = lv

lv = new Level(lv)
lv.setMapColors(4, 4, wetGrass, 'orange')
lv.addKnight(2, 2)
lv.addDragon('Fire Dragonling', 'fire', 'orange',
  {
    '#11aa55': dirt,
    '#995533': 'orange',
    'orange': dirt
  }
)
lv.description = 'The enemy is has found a way to deter our progress. Looks like they have thrown water on this field. Might need to sear the grass down to dirt before the fire will take.'
levels['Level 2'] = lv

lv = new Level()
lv.setMapColors(4, 4, wetGrass, ice)
lv.addKnight(1, 1)
lv.addDragon('Ice Dragonling', 'ice', ice,
  {
    '#11aa55': ice,
    '#aaccff': wetGrass
  }
)
lv.description = 'Aha, new plan! Your ice dragonling reinforcements have arrived. It will be easy to freeze even a water-laden field.'
levels['Level 3'] = lv

lv = new Level()
lv.setMapColors(4, 4, wizardry, ice)
lv.addKnight(1, 1)
lv.addDragon('Ice Dragonling', 'ice', ice,
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
levels['Level 4'] = lv

lv = new Level()
lv.setMapColors(5, 5, wizardry, ice)
lv.addKnight(2, 4)
lv.addKnight(4, 2)
lv.addDragon('Ice Dragonling', 'ice', ice,
  {
    '#eeee33': dirt,
    '#995533': ice,
    '#aaccff': dirt
  }
)
lv.description = 'Two knights now! What are they defending? The castle is still a ways off.'
levels['Level 5'] = lv

lv = new Level()
lv.setMapColors(5, 5, grass, ice)
lv.addWizard(wizardry, 2, 2)
lv.addDragon('Ice Dragonling', 'ice', ice,
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
levels['Level 6'] = lv

module.exports = levels
