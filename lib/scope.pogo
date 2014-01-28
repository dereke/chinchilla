_       = require 'underscore'
finders = require './finders'
actions = require './actions'
query   = require './query'

module.exports(element) =
  _.extend({}, finders(element), actions(element), query(element), module.exports.scope(element))

module.exports.scope(element)=
  find = finders(element).find
  scope = {
    within!(locator, block)=
      if (!block)
        @throw @new Error(module.exports.errors.no block)

      element = find!(locator)
      block!(module.exports(element))
  }


module.exports.errors = {
  no block = 'You must call this with a block'
}