finders = require './finders'

module.exports(element) =
  find = finders(element).find

  {
    click!(locator) =
      item = find(locator)
      handler(e) =
        item.off('click', handler)
        if (continuation)
          set timeout
            continuation(nil,e)
          0

      item.on('click', handler)
      item.click()
  }
