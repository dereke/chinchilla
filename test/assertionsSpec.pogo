chai =  require 'chai'
chinchilla = require '../index'
elements  = require './elementHelper'

chai.use(require('../lib/assertions'))
chai.should()

describe 'assertions'
  describe 'have selector'
    it 'has an element'
      element = elements.attach('<div><span class="find-me">test</span></div>')
      browser = chinchilla(element)

      browser.should.have selector!('span')

    it 'does not have an element'
      element = elements.attach('<div></div>')
      browser = chinchilla(element)

      browser.should.not.have selector!('button')

    it 'has a number of elements'
      element = elements.attach('<div><span></span><span></span></div>')
      browser = chinchilla(element)

      browser.should.have selector!('span', count: 2)

    it 'does not have a number of elements'
      element = elements.attach('<div><span></span></div>')
      browser = chinchilla(element)

      browser.should.not.have selector!('span', count: 2)