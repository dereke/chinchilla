scope     = require '../lib/scope'
elements  = require './elementHelper'

describe 'scope'
  describe 'within'
    it 'is supplied with a context block'
      run without block()=
        scope('<div></div>').within('div')

      chai.expect(run without block).to.throw(scope.errors.no block error message)

    it 'runs code within context of selected element'
      element = elements.attach('<div><div class="within-scope"><span class="element"></span></div><span class="out-of-scope"></span></div>')
      expectation ran = false
      scope(element).within!('.within-scope') @(scope)
        scope.timeout = 10
        expectation ran := true
        scope.has selector!('.element').should.be.true
        scope.has selector!('.out-of-scope').should.be.false

      expectation ran.should.be.true

