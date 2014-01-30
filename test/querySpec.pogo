query     = require '../index'
elements  = require './elementHelper'

describe 'query'
  describe 'is visible'
    it 'returns true when it is visible'
      element = elements.attach('<div><span class="find-me">test</span></div>')
      query(element).is visible!('.find-me').should.be.true

    it 'returns false when it is not visible'
      element = elements.attach('<div><span class="find-me" style="display:none">test</span></div>')
      query(element).is visible!('.find-me', options: {timeout = 0}).should.be.false

    describe 'delay'
      it 'returns true even if it is not immediately visible'
        element = elements.attach('<div><span class="find-me" style="display:none">test</span></div>')
        set timeout
          element.find('.find-me').show()
        100
        query(element).is visible!('.find-me', options: {timeout = 200}).should.be.true

  describe 'has selector'
    it 'returns true when the selector matches an element'
      element = elements.attach('<div><span class="find-me">test</span></div>')
      query(element).has selector!('.find-me').should.be.true

    it 'returns false when the selector does not match an element'
      element = elements.attach('<div></div>')
      query(element).has selector!('.find-me').should.be.false

    describe 'count'
      it 'returns true when there are x number of matches'
        element = elements.attach('<div><span>test1</span><span>test2</span></div>')
        query(element).has selector!('span', count: 2).should.be.true

      it 'returns false when there are not x number of matches'
        element = elements.attach('<div><span>test1</span><span>test2</span></div>')
        query(element).has selector!('span', count: 3).should.be.false