module.exports(chai, utils)=
  have selector!(assert, locator, options)=
    scope = utils.flag(assert, 'object')
    if (utils.flag(assert, 'negate'))
      @throw @new Error("This assertion cannot be used with a negation.\nPlease use 'not have selector' instead.")

    count = nil
    if (options)
      count := options.count

    has selector = scope.has selector!(locator, count: count)


    message = 'to exist'
    if (count && !has selector)
      message := "to have #(count) occurrences (only #(scope.find!(locator).length) found)"

    {
      has selector  = has selector
      message       = message
    }


  chai.Assertion.addMethod('haveSelector') @(locator, options)
    result = have selector!(this, locator, options)
    assert(result.has selector, "expected element '#(locator)' #(result.message)")

  chai.Assertion.addMethod('notHaveSelector') @(locator, options)
    result = have selector!(this, locator, options)
    assert(!result.has selector, "expected element '#(locator)' not #(result.message)")

  be visible!(assert, locator, options: nil)=
    scope = utils.flag(assert, 'object')
    if (utils.flag(assert, 'negate'))
      @throw @new Error("This assertion cannot be used with a negation.\nPlease use 'not be visible' instead.")

    scope.is visible!(locator, options: options)

  chai.Assertion.addMethod('beVisible') @(locator)
    is visible = be visible!(this, locator)
    assert(is visible, "expected element '#(locator)' to be visible")

  chai.Assertion.addMethod('notBeVisible') @(locator)
    is visible = be visible!(this, locator, options: {timeout = 10})
    assert(!is visible, "expected element '#(locator)' not to be visible")