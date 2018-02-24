import { expect } from 'chai'
import Character from '../src/character.js'
import Level from '../src/level.js'

let level = null
describe('Level', () => {
  beforeEach(() => {
    level = new Level()
  })

  it('can have characters added to it', () => {
    level.addCharacter(new Character('myId'))
    level.addCharacter(new Character('other_id'))
    expect(level.getCharacters().length).to.equal(2)
  })

  it('increments character ids if they are the same', () => {
    level.addCharacter(new Character('abc'))
    expect(level.getCharacters()[0].id).to.equal('abc_1')
    level.addCharacter(new Character('abc'))
    expect(level.getCharacters()[1].id).to.equal('abc_2')
    level.addCharacter(new Character('my_id_1'))
    expect(level.getCharacters()[2].id).to.equal('my_id_1')
    level.addCharacter(new Character('my_id'))
    expect(level.getCharacters()[3].id).to.equal('my_id_2')
  })

  it('can add knights directly', () => {
    level.addKnight(1, 2)
    expect(level.getKnights()[0].startIndex).to.equal('1_2')
    level.addCharacter(new Character('abc'))
    expect(level.getKnights().length).to.equal(1)
    expect(level.getCharacters().length).to.equal(2)
    level.addKnight(0, 0)
    let knights = level.getKnights()
    expect(knights.length).to.equal(2)
    expect(level.getCharacters().length).to.equal(3)
    expect(knights[0].id).to.not.equal(knights[1].id)
  })

 it('sets up the board\'s starting colors', () => {
    level.setMapColors(4, 5, '#aabbcc', 'gray')
    expect(level.baseColors.length).to.equal(4)
    expect(level.baseColors[0].length).to.equal(5)
    level.baseColors.forEach(r => {r.forEach(o => { expect(o.color).to.equal('#aabbcc')})})
  })

  // TODO goal conditions  
})
