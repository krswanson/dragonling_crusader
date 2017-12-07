// Any hex colors must be in lowercase, such as #aabbcc
let levels = {}
let level = {
  rows: 4,
  cols: 4,
  baseColor: '',
  goalColor: '',
  type: '',
  mapping: {}
}
let grass = '#44aa11'
let fireLevel = Object.create(level)
fireLevel.baseColor = grass
fireLevel.goalColor = 'orange'
fireLevel.type = 'fire'
fireLevel.mapping = {
  '#44aa11': 'orange',
  'orange': grass
}
levels['fire_1'] = Object.create(fireLevel)
let fire2 = Object.create(fireLevel)
fire2.mapping = {
  '#44aa11': 'brown',
  'brown': 'orange',
  'orange': 'brown'
}
levels['fire_2'] = fire2
let fire3 = Object.create(fireLevel)
fire3.mapping = {
  '#44aa11': 'brown',
  'brown': 'red',
  'red': 'orange',
  'orange': 'brown'
}
levels['fire_3'] = fire3

let ice = '#aaccff'
let iceLevel = Object.create(level)
iceLevel.baseColor = grass
iceLevel.goalColor = ice
iceLevel.type = 'ice'
iceLevel.mapping = {
  '#44aa11': ice,
  '#aaccff': grass
}
levels['ice_1'] = Object.create(iceLevel)
let ice2 = Object.create(iceLevel)
ice2.mapping = {
  '#44aa11': 'brown',
  'brown': ice,
  '#aaccff': 'brown'
}
levels['ice_2'] = ice2

module.exports = levels
