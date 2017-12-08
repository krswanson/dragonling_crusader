import { expect } from 'chai'
import Character from '../src/character.js'

let char = null
let id = 'myChar'
let image = 'image.png'
let startIndex = '0_0'
let isPlayer = true
describe('Character', () => {
  beforeEach(() => {
    char = new Character(id, image, startIndex, isPlayer)
  })

  it('creates a Character with image, id, startIndex, and isPlayer properties', () => {
    expect(char.id).to.equal(id)
    expect(char.image).to.equal(image)
    expect(char.startIndex).to.equal(startIndex)
    expect(char.isPlayer).to.equal(isPlayer)
  })

  it('returns given color for transformColor', () => {
    expect(char.transformColor('purple')).to.equal('purple')
  })

  it('can be given inValidColors', () => {
    expect(char.validSpace({ style: { background: 'pink' } })).to.be.true
    char.addInvalidColor('pink')
    expect(char.validSpace({ style: { background: 'pink' } })).to.be.false
  })
})
