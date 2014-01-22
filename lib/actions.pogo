finders     = require './finders'
wait until  = require('./waitUntil').wait until

module.exports(element) =
  find = finders(element).find

  invoke(el, event name, continuation) =
    el.one(event name) @(e)
      if (continuation)
      // wait for the browser to catch up.
      // certain circumstances where one is not enough!
        set timeout
          set timeout
            continuation(nil,e)
          0
        0

    el.trigger(event name)

  {
    click!(locator, first: false) =
      el = find(locator)
      if (first)
        el := $(el.0)

      invoke(el, 'click', continuation)

    select!(text, from: nil) =
      select element = find(from)

      select element.find('option').each @(index, option)
        if ($(option).text() == text)
          select element.val($(option).val())
          select element.change()

    fill in!(locator, with value: nil) =
      wait until!()
        find(locator).length > 0

      fill element = find(locator)
      fill element.val(with value)
      invoke(fill element, 'change', continuation)
  }
