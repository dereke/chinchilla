scope       = require './lib/scope'
assertions  = require './lib/assertions'
angular     = require './lib/angular/bootstrap'

module.exports(element)=
  scope(element)

module.exports.bootstrap angular = angular.bootstrap angular
module.exports.assertions = assertions