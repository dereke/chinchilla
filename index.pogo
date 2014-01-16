_       = require 'underscore'
finders = require './lib/finders'
actions = require './lib/actions'

module.exports(element)=
  _.extend({}, finders(element), actions(element))