module.exports(chai, utils)=
  chai.Assertion.addMethod('haveSelector') @(locator, options)
    count = nil
    if (options)
      count := options.count

    obj = this._obj
    should equal = true
    if (this.__flags.negate)
      should equal := false

    acceptable = obj.has selector!(locator, count: count) == should equal

    message = 'to exist'
    if (count && !acceptable)
      message := "to have #(count) occurrences (only #(obj.find!(locator).length) found)"


    this.assert(acceptable, "expected element '#(locator)' #(message)", "expected element '#(locator)' not #(message)", locator, "nothing")
