chai =  require 'chai'
chinchilla = require '../index'
elements  = require './elementHelper'

chai.use(require('../lib/assertions'))
chai.should()

describe 'assertions'
  describe 'have selector'
    describe 'positive'
      it 'has an element'
        element = elements.attach('<div><span class="find-me">test</span></div>')
        browser = chinchilla(element)

        browser.should.have selector!('span')

      it 'throws a nice error message'
        element = elements.attach('<div></div>')
        browser = chinchilla(element)

        error message = run failing code!()
          browser.should.have selector!('span')

        expect(error message).to.equal("expected element 'span' to exist")

    describe 'negative'
      it 'does not have an element'
        element = elements.attach('<div></div>')
        browser = chinchilla(element, {timeout = 10})

        browser.should.not have selector!('button')

      it 'throws a nice error message'
        element = elements.attach('<div><button></button></div>')
        browser = chinchilla(element, {timeout = 10})

        error message = run failing code!()
          browser.should.not have selector!('button')

        expect(error message).to.equal("expected element 'button' not to exist")

    describe 'count'
      describe 'positive'
        it 'has a number of elements'
          element = elements.attach('<div><span></span><span></span></div>')
          browser = chinchilla(element)

          browser.should.have selector!('span', count: 2)

        it 'throws a nice error message'
          element = elements.attach('<div><span></span></div>')
          browser = chinchilla(element, {timeout = 10})

          error message = run failing code!()
            browser.should.have selector!('span', count: 2)

          expect(error message).to.equal("expected element 'span' to have 2 occurrences (only 1 found)")

      describe 'negative'
        it 'does not have a number of elements'
          element = elements.attach('<div><span></span></div>')
          browser = chinchilla(element, {timeout = 10})

          browser.should.not have selector!('span', count: 2)

        it 'throws a nice error message'
          element = elements.attach('<div><span></span><span></div>')
          browser = chinchilla(element, {timeout = 10})

          error message = run failing code!()
            browser.should.not have selector!('span', count: 2)

          expect(error message).to.equal("expected element 'span' not to exist")


run failing code!(block)=
  try
    block!()
  catch(e)
    e.message