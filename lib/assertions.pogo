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

