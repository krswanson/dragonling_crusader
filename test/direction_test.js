import { expect } from 'chai'
import sinon from 'sinon'
import Direction from '../src/helpers/direction.js'

const words = ['up', 'down', 'left', 'right', 'up_left', 'up_right', 'down_left', 'down_right']
const vectors = [[0, 1], [0, -1], [-1, 0], [1, 0], [-1, 1], [1, 1], [-1, -1], [1, -1]]
let eLog = null
describe('Direction', () => {
  beforeEach(() => {
    eLog = sinon.stub(console, 'error')
  })

  it('coverts words to vectors', () => {
    words.forEach((w, i) => {
      let v = Direction.convertToVector(w)
      expect(v.length).to.equal(2)
      expect(v[0]).to.equal(vectors[i][0])
      expect(v[1]).to.equal(vectors[i][1])
    })
    expect(eLog.called).to.be.false
  })

  it('coverts vectors to words', () => {
    vectors.forEach((v, i) => {
      let word = Direction.convertToWord(v)
      expect(word).to.equal(words[i])
    })
    expect(eLog.called).to.be.false
  })

  it('can make words, Directions, and vectors into vectors', () => {
    words.forEach((w, i) => {
      let v = Direction.makeVector(w)
      expect(v.length).to.equal(2)
      expect(v[0]).to.equal(vectors[i][0])
      expect(v[1]).to.equal(vectors[i][1])
      let d = new Direction(w)
      v = Direction.makeVector(d)
      expect(v[0]).to.equal(vectors[i][0])
      expect(v[1]).to.equal(vectors[i][1])
    })
    vectors.forEach((v, i) => {
      let word = Direction.makeVector(v)
      expect(v.length).to.equal(2)
      expect(v[0]).to.equal(vectors[i][0])
      expect(v[1]).to.equal(vectors[i][1])
      let d = new Direction(v)
      v = Direction.makeVector(d)
      expect(v[0]).to.equal(vectors[i][0])
      expect(v[1]).to.equal(vectors[i][1])
    })
    expect(eLog.called).to.be.false
  })

  it('logs an error if given bad word keyword', () => {
    Direction.convertToVector(null)
    expect(eLog.calledOnce).to.be.true
  })

  it('logs an error if given bad vector', () => {
    Direction.convertToWord(null)
    expect(eLog.calledOnce).to.be.true
  })

  afterEach(() => {
     eLog.restore()
  })
})
