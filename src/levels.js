// Any hex colors must be in lowercase, such as #aabbcc
let levels = {}
let level = {
  rows: 4,
  cols: 4,
  baseColor: '',
  goalColor: '',
  type: '',
  mapping: {},
  description: ''
}
let grass = '#44aa11'
let fireLevel = Object.create(level)
fireLevel.baseColor = grass
fireLevel.goalColor = 'orange'
fireLevel.goalColors = ['orange', 'gray']
fireLevel.type = 'fire'
fireLevel.mapping = {
  '#44aa11': 'orange',
  'orange': grass
}
fireLevel.description = 'Your dragonlings start their conquest on a grassy field.  This lands\' knights seem fond of it for some reason, so obviously you must take it away from them! Send this fire dragonling to take it over.'
levels['fire_1'] = Object.create(fireLevel)
let fire2 = Object.create(fireLevel)
fire2.mapping = {
  '#44aa11': 'brown',
  'brown': 'orange',
  'orange': 'brown'
}
fire2.description = 'That wasn\'t so hard! Have your dragonling set this even grassy-er field on fire. You may need to burn the grass to the ground before it will catch properly.'
levels['fire_2'] = fire2
let fire3 = Object.create(fireLevel)
let wetGrass = '#11aa55'
fire3.baseColor = wetGrass
fire3.mapping = {
  '#11aa55': 'brown',
  'brown': 'red',
  'red': 'orange',
  'orange': 'brown'
}
fire3.description = 'The enemy is getting smarter. Looks like they have thrown water on this field. You may need to heat the ground to get all the water out. But you must take it to get to the castle!'
levels['fire_3'] = fire3

let ice = '#aaccff'
let iceLevel = Object.create(level)
iceLevel.baseColor = wetGrass
iceLevel.goalColor = [ice, 'gray']
iceLevel.type = 'ice'
iceLevel.mapping = {
  '#11aa55': ice,
  '#aaccff': wetGrass
}
iceLevel.description = 'Aha, new plan! Your ice dragonling reinforcements have arrived. It will be easy to freeze even a water-laden field.'

levels['ice_1'] = Object.create(iceLevel)
let ice2 = Object.create(iceLevel)
ice2.baseColor = '#ddcc11'
ice2.mapping = {
  '#ddcc11': 'brown',
  'brown': ice,
  '#aaccff': 'brown'
}
ice2.description = 'Hmm, this field\'s grass looks strange.  Did they do something to it?'

levels['ice_2'] = ice2

module.exports = levels
