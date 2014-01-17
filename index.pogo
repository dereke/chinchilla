_       = require 'underscore'
finders = require './lib/finders'
actions = require './lib/actions'
query   = require './lib/query'
angular = require './lib/angular/bootstrap'

module.exports(element)=
  _.extend({}, finders(element), actions(element), query(element))

module.exports.bootstrap angular = angular.bootstrap angular