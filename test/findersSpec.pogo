finders = require '../lib/finders'
$       = require './vendor/jquery'

describe 'finders'
  it 'finds an element in an html document'
    element = $('<div><span class="find-me"></span></div>')

    found element = finders(element: element).find!('.find-me')
    found element.length.should.equal(1)