wait until  = require('./waitUntil').wait until

module.exports(element) =
  {
    find!(locator) =
      wait until!()
        if (!locator)
          @throw @new Error('It seems like find was not called with the async operator - `!` in pogo)')

        element.find(locator).length > 0

      element.find(locator)
  }
