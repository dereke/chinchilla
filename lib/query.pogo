wait until  = require('./waitUntil').wait until

module.exports(scope) =
  {
    is visible!(locator, options: nil) =
      element = scope.find!(locator)
      wait until!(scope: scope, options: options)
        element.is(':visible')

      element.is(':visible')

    has selector!(locator, count: nil)=
      number of elements = scope.find!(locator).length
      if (count)
        number of elements == count
      else
        number of elements > 0
  }
