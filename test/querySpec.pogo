query     = require '../lib/query'
elements  = require './elementHelper'

describe 'query'
  describe 'is visible'
    it 'returns true when it is visible'
      element = elements.attach('<div><span class="find-me">test</span></div>')
      query(element).is visible('.find-me').should.be.true

    it 'returns false when it is not visible'
      element = elements.attach('<div><span class="find-me" style="display:none">test</span></div>')
      query(element).is visible('.find-me').should.be.false
