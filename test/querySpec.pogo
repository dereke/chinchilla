query     = require '../lib/query'
elements  = require './elementHelper'

describe 'query'
  describe 'is visible'
    it 'returns true when it is visible'
      element = elements.attach('<div><span class="find-me">test</span></div>')
      query(element).is visible!('.find-me').should.be.true

    it 'returns false when it is not visible'
      element = elements.attach('<div><span class="find-me" style="display:none">test</span></div>')
      query(element).is visible!('.find-me').should.be.false

  describe 'has selector'
    it 'returns true when the selector matches an element'
      element = elements.attach('<div><span class="find-me">test</span></div>')
      query(element).has selector!('.find-me').should.be.true

    it 'returns false when the selector does not match an element'
      element = elements.attach('<div></div>')
      query(element).has selector!('.find-me').should.be.false
