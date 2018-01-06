import { expect } from 'chai'
import Knight from '../src/knight.js'

let knight = null

describe('Knight', () => {
  beforeEach(() => {
    knight = new Knight()
  })

  it('creates a knight with certain Character properties', () => {
    expect(knight).to.have.property('images')
    expect(knight).to.have.property('id')
    expect(knight).to.have.property('startIndex')
    expect(knight.transformColor('my color')).to.equal('my color')
    expect(knight.isPlayer).to.be.false
  })

  it('has a frequency', () => {
    expect(knight.frequency).to.be.a('number')
    expect(knight.frequency > 0).to.be.true
  })

  it('can have its frequency changed', () => {
    knight.setFrequency(5001)
    expect(knight.frequency).to.equal(5001)
  })

  it('can move', (done) => {
    knight.myProp = 0
    knight.setFrequency(1)
    knight.startMoving(() => {
      knight.myProp++
    })
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    sleep(5).then(() => {
      expect(knight.myProp > 0).to.be.true
      let current = knight.myProp
      sleep(5).then(() => {
        expect(knight.myProp > current).to.be.true
        knight.stopMoving()
        current = knight.myProp
        sleep(5).then(() => {
          expect(knight.myProp).to.equal(current)
          done()
        })
      })
    })
  })
})
