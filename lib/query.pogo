finders     = require './finders'

module.exports(element) =
  find = finders(element).find
  {
    is visible!(locator) =
      find!(locator).is(':visible')

    has selector!(locator, count: nil)=
      number of elements = find!(locator).length
      if (count)
        number of elements == count
      else
        number of elements > 0
  }
