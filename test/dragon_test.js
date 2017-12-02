import { expect } from 'chai'
import Dragon from '../src/dragon.js'

let mapping = { 'green': 'orange', 'orange': 'green' }
let color = 'orange'
let type = 'fire'
let dragon = new Dragon(mapping, color, type)

describe('Dragon', () => {
  it('creates a dragon with the given properties', () => {
    expect(dragon.mapping).to.equal(mapping)
    expect(dragon.color).to.equal(color)
    expect(dragon.type).to.equal(type)
  })

  it('creates a dragon with certain Character properties', () => {
    expect(dragon).to.have.property('image')
    expect(dragon).to.have.property('id')
    expect(dragon).to.have.property('startIndex')
  })

  it('sets the startSquare to the dragon\'s color by default', () => {
    expect(dragon.startSquare).to.equal(color)
  })

  it('can have a different color startSquare than the dragon\'s color', () => {
    let dragon = new Dragon(mapping, color, type, 'green')
    expect(dragon.color).to.equal(color)
    expect(dragon.startSquare).to.equal('green')
  })

  it('transforms colors using the given mapping', () => {
    expect(dragon.transformColor('green')).to.equal('orange')
    expect(dragon.transformColor('orange')).to.equal('green')
  })

  it('returns null if the given color is not defined in the mapping', () => {
    expect(dragon.transformColor('purple')).to.equal(null)
  })
})
