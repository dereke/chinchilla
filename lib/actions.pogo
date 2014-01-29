module.exports(scope) =
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
      el = scope.find!(locator)
      if (first)
        el := $(el.0)

      invoke(el, 'click', continuation)

    click link!(text)=
        self.click! "a:contains(#(text))"

    click button!(text)=
        self.click! "button:contains(#(text))"

    select!(text, from: nil) =
      select element = scope.find!(from)

      select element.find('option').each @(index, option)
        if ($(option).text() == text)
          select element.val($(option).val())
          select element.change()

    fill in!(locator, with value: nil) =
      fill element = scope.find!(locator)
      fill element.val(with value)
      invoke(fill element, 'change', continuation)
  }
