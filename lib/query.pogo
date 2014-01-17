finders = require './finders'

module.exports(element) =
  find = finders(element).find
  {
    is visible(locator) =
      find(locator).is(':visible')
  }
