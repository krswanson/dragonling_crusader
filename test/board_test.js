// import { expect } from 'chai'
import { expect } from 'chai'
import sinon from 'sinon'
import Board from '../src/elements/board.js'
import Character from '../src/characters/character.js'

let board = new Board()
    let c1 = new Character('dragon',
      ['images/64px/sea_serpent', 'fore', 'back'],
      '0_0',
      true, // is player
      null) // no move frequency)
let validateSpaceStub = sinon.stub(board, 'validateSpace')
let transformColorStub = sinon.stub(c1, 'transformColor').returns('pink')
// TODO check imageHTML() does different things if phone screen is true
let isPhoneScreenStub = sinon.stub(board, 'isPhoneScreen').returns(false)
let space = null
let getRelativeSpaceStub = null
let getSpaceStub = null
let fakeElement = null

describe('Board', () => {
  beforeEach(() => {
    board.characters = {'dragon': c1 }
    getSpaceStub = sinon.stub(board, 'getSpace')
    fakeElement = {innerHTML: 'something',
    classList: {add: sinon.stub(), remove: sinon.stub()},
    style: {padding: '', backgroundColor: 'orange'}}
    getSpaceStub.returns(fakeElement)
    validateSpaceStub.returns(true)
    space = {style: {backgroundColor: 'green'}}
    getRelativeSpaceStub = sinon.stub(board, 'getRelativeSpace').returns(space)
  })

  it('sets up the board')

  it('can fully delete the board from the DOM')
  
  it('can be reused with no side effects after the board is deleted')

  it('can change the background of a space', () => {
    board.changeBackground(fakeElement, c1)
    expect(space.style.backgroundColor).to.equal('pink')
    expect(getRelativeSpaceStub.called).to.be.true
  })

  it('can add a character to a space', () => {
    let stub = sinon.stub(board, 'changeBackground')
    board.add(c1, fakeElement)
    expect(validateSpaceStub.calledOnce).to.be.true
    expect(fakeElement.classList.add.called).to.be.true
    expect(fakeElement.innerHTML.includes('<img')).to.be.true
    expect(fakeElement.innerHTML.
      includes('images/64px/sea_serpent')).to.be.true
    stub.restore()
  })

  it('can remove a character from a space', () => {
    board.remove(c1, fakeElement)
    expect(validateSpaceStub.calledOnce).to.be.true
    expect(fakeElement.classList.remove.called).to.be.true
    expect(fakeElement.innerHTML).to.equal('')
  })

  it('can update a character image on a space', () => {
    board.updateImage(c1)
    expect(getSpaceStub.calledOnce).to.be.true
    expect(fakeElement.innerHTML.includes('<img')).to.be.true
    expect(fakeElement.innerHTML.
      includes('images/64px/sea_serpent')).to.be.true
  })

  afterEach(() => {
    validateSpaceStub.reset()
    getRelativeSpaceStub.restore()
    getSpaceStub.restore()
  })
})
