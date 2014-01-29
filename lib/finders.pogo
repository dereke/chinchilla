wait until  = require('./waitUntil').wait until

module.exports(scope) =
  {
    find!(locator) =
      wait until!(scope: scope)
        if (!locator)
          @throw @new Error('It seems like find was not called with the async operator - `!` in pogo)')

        scope.element.find(locator).length > 0

      scope.element.find(locator)
  }
