finders     = require './finders'

module.exports(element) =
  find = finders(element).find
  {
    is visible!(locator) =
      find!(locator).is(':visible')

    has selector!(locator, count: nil)=
      if (count)
        find!(locator).length == count
      else
        find!(locator).length > 0
  }
