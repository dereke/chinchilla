finders     = require './finders'
wait until  = require('./waitUntil').wait until

module.exports(element) =
  find = finders(element).find
  {
    is visible(locator) =
      find(locator).is(':visible')

    has selector!(locator)=
      wait until!()
        find(locator).length > 0

      find(locator).length > 0
  }
