scope   = require './lib/scope'
angular = require './lib/angular/bootstrap'

module.exports(element)=
  scope(element)

module.exports.bootstrap angular = angular.bootstrap angular