_       = require 'underscore'
finders = require './finders'
actions = require './actions'
query   = require './query'

default config = {
  timeout = 1000
}

module.exports(element, config) =
  if (!config)
    config := default config

  scope = {
    timeout = config.timeout
    element = element
  }
  _.extend(scope, finders(scope), actions(scope), query(scope), module.exports.scope(scope))

module.exports.scope(scope)=
  {
    within!(locator, block)=
      if (!block)
        @throw @new Error(module.exports.errors.no block)

      element = scope.find!(locator)
      block!(module.exports(element))
  }


module.exports.errors = {
  no block = 'You must call this with a block'
}